# CMEI UX / DX / AX implementation contract

This repository is the Creative Media Empowerment Initiative's organisation website.

## Approved visual contracts
- Preserve the homepage cinematic hero composition, navigation placement, typography and full-screen sizing. Animation may only be disabled for users who request reduced motion, use Save-Data, or have very slow networks.
- Preserve the dedicated film page's media composition and floating sheet. The optional full-film player is opened in a dialog.
- Keep the People Behind CMEI rail on the homepage, continuous by default, keyboard-scrollable and respectful of reduced-motion settings.
- Do not add a standalone People page, decorative CTA arrows, unnecessary helper copy, or placeholder sponsor logos.

## Canonical sources
- `src/content/site.ts`: navigation, team, programme pillars, contact options.
- `src/content/siteMeta.json`: page metadata. Build-time `scripts/generate-pages.mjs` renders static crawler-readable HTML routes.
- `src/components/filmCampaign.ts`: film identity, poster/teaser, premiere time and public-watch URL.
- Film lifecycle: `upcoming` → `awaiting_publication` → `available` (only with a verified public URL). Date elapsing does not publish a film.

## Quality gates
- `npm test` verifies film state, calendar time, safe embed links, route metadata and critical visual landmarks.
- `npm run build` runs tests, TypeScript and Vite.
- Before merging, check mobile layouts at 320px, 375px, 430px and desktop; verify keyboard/tab order, screen reader labels, reduced motion, and low-network fallback.
- Do not invent credits, programmes, sponsors, assets or a YouTube watch link.
