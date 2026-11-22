# Mounika Madupoju — Open World Portfolio

An experimental, recruiter-ready 3D portfolio built as an explorable world with React, Three.js and React Three Fiber.

## Experience

Explore five destinations in a single connected environment:

- **The Origin** — About and education
- **The Archive** — Skills and tools
- **Project District** — PayPilot, MedLink, Code Mentor and CareerX
- **Milestone Ridge** — Hackathons, certifications and activities
- **The Beacon** — Email, GitHub and LinkedIn

The world includes free-roam first-person controls, interactive destination markers, a fast-travel world map, discovery progress, a graphics-quality selector and readable HTML content panels.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/madupojumounika/portfolio.git
cd portfolio
npm install
npm run dev
```

Open the local URL printed by Vite.

Production build:

```bash
npm run build
npm run preview
```

## Controls

- Click **Enter the World** / **Walk** to capture the mouse.
- **W A S D** or arrow keys — move.
- **Mouse** — look around.
- **Shift** — move faster.
- **E** — interact with the closest destination marker.
- **World Map** — fast travel to any destination.
- **Esc** — release the mouse / close active overlays.

On smaller screens, use the World Map to jump directly to destinations. A keyboard and pointer are recommended for free-roam movement.

## Technology

- React 18 + Vite
- Three.js
- React Three Fiber
- Drei
- Lucide React

## Free assets and licensing

The current world uses procedural geometry, Three.js environment lighting and generated terrain rather than paid models or subscription assets. Any future third-party models, HDRIs, textures or audio should be sourced from genuinely free libraries and their individual licenses/attributions must be retained in the repository.

## Performance notes

The graphics selector offers low, balanced and high settings. The environment is procedural, so there are no large model downloads in this first implementation. Device-specific performance and browser compatibility still need to be tested locally before deployment.

## Profile links

- GitHub: https://github.com/madupojumounika
- LinkedIn: https://linkedin.com/in/mounikamadupoju
- Email: madupojumounika0@gmail.com

## Project status

This is the first open-world foundation. It establishes the connected environment, navigation, controls and recruiter content. The next visual-production phase is to replace key procedural landmarks and foliage with optimized, license-checked free GLB assets and higher-quality PBR environment materials, then validate frame rate and interaction on desktop and mobile.
