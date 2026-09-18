const digits = {
  hourOne: document.querySelector("#hour-one"),
  hourTwo: document.querySelector("#hour-two"),
  minuteOne: document.querySelector("#minute-one"),
  minuteTwo: document.querySelector("#minute-two")
};

const dateLabel = document.querySelector("#date-label");
const secondsLabel = document.querySelector("#seconds-label");
const secondsProgress = document.querySelector("#seconds-progress");
const yearLabel = document.querySelector("#year-label");
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const menuLinks = [...document.querySelectorAll("#main-nav a")];
const timeAnnouncement = document.querySelector("#time-announcement");

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  weekday: "long",
  day: "numeric",
  month: "long"
});

const yearFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  year: "numeric"
});

let previousTime = "";

function initialiseFlipCard(element) {
  const value = element.dataset.value || "0";
  element.innerHTML = `
    <span class="card-half top" aria-hidden="true"><span class="card-value">${value}</span></span>
    <span class="card-half bottom" aria-hidden="true"><span class="card-value">${value}</span></span>
    <span class="flip-half top" aria-hidden="true"><span class="card-value">${value}</span></span>
    <span class="flip-half bottom" aria-hidden="true"><span class="card-value">${value}</span></span>
  `;
}

function setDigit(element, value) {
  const currentValue = element.dataset.value;
  if (currentValue === value || element.classList.contains("flipping")) return;

  const staticTop = element.querySelector(".card-half.top .card-value");
  const staticBottom = element.querySelector(".card-half.bottom .card-value");
  const flipTop = element.querySelector(".flip-half.top .card-value");
  const flipBottom = element.querySelector(".flip-half.bottom .card-value");

  staticTop.textContent = currentValue;
  staticBottom.textContent = value;
  flipTop.textContent = currentValue;
  flipBottom.textContent = value;
  element.classList.add("flipping");

  const finishFlip = () => {
    element.dataset.value = value;
    element.setAttribute("aria-label", value);
    staticTop.textContent = value;
    staticBottom.textContent = value;
    element.classList.remove("flipping");
  };

  element.querySelector(".flip-half.bottom")
    .addEventListener("animationend", finishFlip, { once: true });
  window.setTimeout(() => {
    if (element.classList.contains("flipping")) finishFlip();
  }, 750);
}

function updateClock() {
  const now = new Date();
  const parts = Object.fromEntries(
    timeFormatter.formatToParts(now)
      .filter(part => part.type !== "literal")
      .map(part => [part.type, part.value])
  );
  const time = `${parts.hour}${parts.minute}`;

  if (time !== previousTime) {
    setDigit(digits.hourOne, parts.hour[0]);
    setDigit(digits.hourTwo, parts.hour[1]);
    setDigit(digits.minuteOne, parts.minute[0]);
    setDigit(digits.minuteTwo, parts.minute[1]);
    previousTime = time;
    timeAnnouncement.textContent = `Current time in London: ${parts.hour}:${parts.minute}`;
  }

  const seconds = Number(parts.second);
  secondsLabel.textContent = `${parts.second} seconds`;
  secondsProgress.style.width = `${((seconds + 1) / 60) * 100}%`;
  dateLabel.textContent = dateFormatter.format(now);
  yearLabel.textContent = yearFormatter.format(now);
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("naik-theme", theme);
  const dark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(dark));
  themeToggle.setAttribute("aria-label", dark ? "Use light theme" : "Use dark theme");
}

const storedTheme = localStorage.getItem("naik-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
applyTheme(storedTheme || preferredTheme);

Object.values(digits).forEach(initialiseFlipCard);

themeToggle.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

menuToggle.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

menuLinks.forEach(link => link.addEventListener("click", () => {
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
}));

updateClock();
setInterval(updateClock, 1000);
