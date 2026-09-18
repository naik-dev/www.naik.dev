# Project notes

## Purpose

Create a new personal website for `www.naik.dev`. The current scaffold treats
the domain as a flexible home for experiments, technical notes, references, and
work in progress.

## Content to decide

- The primary purpose: personal profile, technical portfolio, writing, or studio
- Final biography and introduction
- Real project names, summaries, links, and imagery
- Contact method and social profiles
- Whether notes need individual pages or a lightweight content system

## Design direction

The interface uses a typographic clock as its central visual idea. It is original
CSS and JavaScript and does not include the two reference images stored in the
separate `/Users/shrnaik/dev/naikdev` folder.

## Deployment

The project is stored in the public GitHub repository
`naik-dev/www.naik.dev`. GitHub is used only for source control; GitHub Pages
must remain disabled.

Cloudflare configuration:

- Account ID: `206af19c8ad658c40528f31e39cf6ca6`
- Pages project: `www-naik-dev`
- Pages hostname: `www-naik-dev.pages.dev`
- Custom domain: `www.naik.dev`
- DNS: proxied CNAME from `www` to `www-naik-dev.pages.dev`

The current Pages project uses Direct Upload. Git pushes do not deploy
automatically. Deploy the current working tree with:

```sh
./scripts/deploy-cloudflare.sh
```

Changes pushed to `main` should be reviewed locally before publication:

```sh
python3 -m http.server 8099
```
