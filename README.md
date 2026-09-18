# Naik.dev

[www.naik.dev](https://www.naik.dev) is a personal space for experiments,
technical notes, references, and work in progress.

The current design is built around the idea **“Ideas that move with time”**. Its
centre-piece is a live London clock rendered as an original retro split-flap
display, supported by a compact project index and a deliberately unfinished
editorial structure.

## Features

- Live time in the `Europe/London` time zone
- Animated retro flip-clock digits
- Large clock-inspired `NAIK.DEV` wordmark
- Light and dark colour themes with saved user preference
- Responsive layouts for desktop, tablet, and mobile
- Project index, About section, and external contact link
- Reduced-motion support
- Local SVG favicon
- No framework, package dependencies, analytics, or tracking

## Colour palette

The visual system uses the following palette:

| Colour | Hex | Use |
| --- | --- | --- |
| Orange | `#FF9F1C` | Primary accent and progress |
| Sand | `#FFBF69` | Secondary accent |
| White | `#FFFFFF` | Surfaces and contrast |
| Mint | `#CBF3F0` | Main light background |
| Teal | `#2EC4B6` | Clock surround and controls |

Dark teal shades are used for readable text and the mechanical clock panels.

## Technology

The website is intentionally small and dependency-free:

- Semantic HTML
- Responsive CSS
- Vanilla JavaScript
- Cloudflare Pages hosting

The clock uses `Intl.DateTimeFormat` so its time and date remain tied to London
through daylight-saving changes.

## Project structure

```text
.
├── app.js
├── favicon.svg
├── index.html
├── PROJECT_NOTES.md
├── scripts/
│   ├── check.sh
│   └── deploy-cloudflare.sh
└── styles.css
```

- `index.html` contains the content and page structure.
- `styles.css` defines the colour system, responsive layout, and flip animation.
- `app.js` updates the London clock and stores the selected theme.
- `PROJECT_NOTES.md` records operational details and future content decisions.

## Run locally

From the repository root:

```sh
python3 -m http.server 8099
```

Open `http://localhost:8099`.

Run the project checks with:

```sh
./scripts/check.sh
```

## Deployment

GitHub is used only for source control. GitHub Pages is disabled.

The website is hosted by Cloudflare Pages:

- Cloudflare project: `www-naik-dev`
- Pages hostname: `www-naik-dev.pages.dev`
- Custom domain: `www.naik.dev`

Deploy the current working tree:

```sh
./scripts/deploy-cloudflare.sh
```

The deployment script validates the project, stages only the four public files,
and uploads them to the existing Cloudflare Pages project. Wrangler may request
Cloudflare OAuth authorization if the local session has expired.

## Repository

The source repository is public at `naik-dev/www.naik.dev`. Pushes to `main` do
not currently deploy automatically because the Cloudflare project uses Direct
Upload.
