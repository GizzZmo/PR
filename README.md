# Jon Arve Ovesen – Promotional Website

[![CI](https://github.com/GizzZmo/PR/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/GizzZmo/PR/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/GizzZmo/PR/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/GizzZmo/PR/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Website](https://img.shields.io/badge/Website-Live-brightgreen)](https://gizzzmo.github.io/PR/)

A single-page promotional and PR website for **Jon Arve Ovesen**, Norwegian composer,
producer, and sound architect from Eidsvoll, Norway.

## Overview

This site serves as the central hub for Jon Arve Ovesen's public relations and promotional
campaign, built around the story of a self-taught musician with 40+ years of atmospheric
electronic music — finally breaking through.

## Features

| Section | Purpose |
|---|---|
| **Hero** | Striking atmospheric landing with animated particle canvas |
| **About** | Full biography, unique strengths, and key stats |
| **Music** | Discography grid with streaming links (Spotify, Apple Music, YouTube, Bandcamp) |
| **The Vault** | "From the Vault" archive-release series with story per track |
| **AI Experiments** | Highlights Jon's exploration of AI-assisted composition |
| **Press** | Official bio, media assets checklist, key facts, and story angles |
| **Campaign Overview** | 6 strategic pillars and measurable 6–12 month goals |
| **Newsletter** | Email signup for vault updates and studio news |
| **Contact** | Booking, press, and sync/licensing enquiry form |

## Structure

```
/
├── index.html            # Main HTML (single page)
├── src/
│   ├── css/
│   │   └── main.css      # All styles (custom properties, responsive)
│   └── js/
│       └── main.js       # Navigation, particles, forms, scroll animations
└── public/
    └── images/           # Press photos and album artwork (add here)
```

## Usage

No build step required. Open `index.html` directly in a browser, or serve with any
static file server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## PR Campaign Strategy

The site reflects a 6-step PR strategy tailored to Jon's authentic voice:

1. **Grounding** – 40+ year journey, self-taught, Norwegian roots, AI curiosity
2. **Success definition** – Streaming growth ×3, 5+ media features, 1K+ community
3. **Target audiences** – Norwegian indie listeners, global ambient/electronic fans, producers
4. **Core pillars** – Storytelling content, media outreach, vault releases, AI crossover, sync
5. **Timeline** – 6–12 month phased rollout
6. **Measurement** – Engagement quality, streaming growth, fan feedback

## Customisation

- Replace placeholder streaming links (`href="#"`) with real platform URLs
- Add press photos to `public/images/` and update the portrait placeholder in `index.html`
- Connect newsletter and contact forms to a backend service (e.g. Formspree, Netlify Forms)
- Update email addresses in the Contact section

## License

MIT © Jon Arve Ovesen
