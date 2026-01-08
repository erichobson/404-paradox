# 404 Paradox

An interactive digital thesis exploring the central paradox of digital preservation through the lens of the ubiquitous "404 Error."

## Thesis Statement

The ubiquitous '404 Error' has evolved from a simple missing page notification into a symbol of digital preservation's central paradox. While digital technology promises perfect reproduction and permanent accessibility, it introduces new layers of potential failure through interface mediation, preservation transformation, and digital decay.

## Overview

This project presents three interconnected explorations:

- **Preservation**: How physical texts transform through digitization and the layered processes of digital preservation
- **Interface**: The evolution of user interfaces from CLI to modern OS and how interface mediation affects accessibility
- **Decay**: Digital degradation, bit rot, and the fragility of seemingly permanent digital artifacts

## Features

- Interactive visualizations exploring each theme
- Animated transitions demonstrating concepts of digital preservation
- Progressive exploration tracking
- Responsive design with mobile support
- Static site deployment to GitHub Pages

## Tech Stack

- **Framework**: SvelteKit 2.x
- **Build Tool**: Vite 6.x
- **Deployment**: GitHub Pages (Static Adapter)
- **Package Manager**: pnpm

## Development

### Prerequisites

- Node.js 18+ (tested with Node.js 23)
- pnpm 9+

### Installation

```bash
pnpm install
```

### Development Server

```bash
pnpm dev
```

This will start the development server at `http://localhost:5173`

### Building for Production

```bash
pnpm build
```

The static site will be generated in the `build/` directory.

### Preview Production Build

```bash
pnpm preview
```

## Deployment

This project is configured to deploy automatically to GitHub Pages via GitHub Actions when pushing to the `main` branch.

The site is deployed to: `https://erichobson.github.io/404-paradox/`

The deployment workflow:
1. Installs dependencies with pnpm
2. Builds the static site with the `/404-paradox` base path
3. Deploys to GitHub Pages

The base path is configured in `svelte.config.js` using `paths.base` to ensure all asset URLs and navigation work correctly on GitHub Pages.

See `.github/workflows/deploy.yml` for the complete workflow configuration.

## Project Structure

```
src/
├── lib/
│   ├── components/      # Reusable Svelte components
│   ├── index.js        # Library exports
│   └── stores.ts       # Svelte stores for state management
├── routes/
│   ├── preservation/   # Preservation section
│   ├── interface/      # Interface evolution section
│   ├── decay/          # Digital decay section
│   ├── conclusion/     # Conclusion section
│   ├── +layout.svelte  # Root layout
│   ├── +layout.js      # Layout configuration (prerendering)
│   └── +page.svelte    # Home page with grid navigation
├── app.css             # Global styles
└── app.html            # HTML template

static/
├── agrippa.txt         # Reference text
└── favicon.png         # Site icon
```

## Configuration Files

- `svelte.config.js` - SvelteKit configuration with static adapter
- `vite.config.js` - Vite build configuration
- `package.json` - Project dependencies and scripts
- `jsconfig.json` - JavaScript/TypeScript configuration
- `.eslintrc.cjs` - ESLint configuration

## License

This is an academic project. All rights reserved.

## Author

Created as a digital thesis exploring themes of digital preservation, accessibility, and decay.
