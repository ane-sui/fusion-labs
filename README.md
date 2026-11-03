# Fusion Labs website

Static HTML, CSS and JavaScript site. The deployable website lives in `dist/`; there is no build step, package installation, or environment configuration.

## Deploy

### Cloudflare Pages with GitHub

Push this repository to GitHub, then create a Pages project in Cloudflare and connect that GitHub repository. Use these build settings:

- **Production branch:** `main` (or the repository's default branch)
- **Build command:** leave empty
- **Build output directory:** `dist`
- **Root directory:** `/`

There is no build step or environment configuration. Keep the complete `dist/` folder structure, including `fonts/`, `images/` and `vendor/`. Cloudflare Pages serves `404.html` for unknown routes.

## Preview locally

Run `python -m http.server 8080 --directory dist` from the repository root and open http://localhost:8080.

## Site files

- `dist/index.html`: homepage, services and contact details.
- `dist/style.css`: site styling.
- `dist/app.js`, `dist/chatbot.js`, `dist/shared.js`, `dist/motion.js`: site interactions.
- `dist/privacy.html`, `dist/terms.html`, `dist/service-policy.html`: policy pages.
- `dist/fonts/`, `dist/images/`, `dist/vendor/`: required fonts, images and animation libraries.

Enquiries open an email draft, copy text or download a brief; no server-side form submission is used. The chatbot runs locally in the visitor's browser and offers WhatsApp or email contact when it cannot answer. Messages are sent only when the visitor chooses to send them in their app.
# fusion-labs
