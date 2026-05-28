# QuotePilot Studio

QuotePilot Studio is a polished React + TypeScript web app for freelancers, consultants, and small agencies that need to turn vague client requests into profitable fixed-price proposals. It calculates a defensible floor price, recommended price, deposit, delivery window, package tier, and proposal scope points.

## Live links

- GitHub repository: https://github.com/Michaelunkai/quote-pilot-studio
- Deployed website: https://michaelunkai.github.io/quote-pilot-studio/
- Netlify status: Netlify CLI was not authenticated, so the production app was deployed on the free GitHub Pages service instead.

## Features

- Interactive proposal pricing calculator
- Launch/Growth/Scale package recommendation
- Rush, margin, complexity, revisions, and delivery-window modeling
- Monetization section for audits, consultations, and template bundles
- Responsive marketing-grade landing page
- Unit/component tests with Vitest and Testing Library
- Production build configured for static hosting

## Local run instructions

From WSL on this machine:

```bash
cd /mnt/f/study/projects/saas/quote-pilot-studio && npm install --no-bin-links && npm run dev
```

On a normal Linux/macOS checkout or Windows terminal where symlinks are allowed:

```bash
npm install && npm run dev
```

## Test and build commands

```bash
npm run lint
npm test
npm run build
```

## Deployment

The live production build is deployed from the `gh-pages` branch to GitHub Pages:

```bash
npm run build
# publish dist/ to gh-pages branch
```

The project also includes `netlify.toml` and is Netlify-ready:

- Build command: `npm run build`
- Publish directory: `dist`

If Netlify authentication is later available, deploy with:

```bash
cd /mnt/f/study/projects/saas/quote-pilot-studio && npx --yes netlify-cli login && npx --yes netlify-cli deploy --prod --build --dir=dist
```

## Monetization instructions

Use QuotePilot Studio as a lead magnet for freelancers and consultants. Share the deployed calculator, capture leads with a booking/contact link, and sell a $99 proposal audit, a paid pricing strategy consultation, or a downloadable bundle of proposal templates and pricing worksheets.

## Tech stack

- React
- TypeScript
- Vite
- Vitest
- Testing Library
- GitHub Pages static hosting
- Netlify-ready static configuration
