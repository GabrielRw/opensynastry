<div align="center">
  <h1>Open Synastry</h1>
  <p>An open-source frontend for astrological synastry analysis.</p>
  <p>Powered by <a href="http://freeastroapi.com">FreeAstroAPI.com</a></p>
  <br/>
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/GabrielRw/opensynastry&env=ASTRO_API_KEY&envDescription=Your%20FreeAstroAPI%20key%20from%20freeastroapi.com">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" />
  </a>
</div>

---

## Deploying to Vercel

Click the button above to clone this repo and deploy it instantly. During the setup, Vercel will ask you to fill in environment variables — make sure to add your `ASTRO_API_KEY`, which you can get for free at [freeastroapi.com](http://freeastroapi.com). Without it, the app will not be able to generate reports.

Once deployed, visit your Vercel URL, enter two sets of birth details, and your synastry report will be generated on the spot.

## Overview

Open Synastry is a web app built with **Next.js** and **Tailwind CSS**. It connects to the Synastry endpoint of [FreeAstroAPI.com](http://freeastroapi.com) to generate detailed relationship compatibility reports from two sets of birth data.

This is fully open source. Fork it, adapt it, or use it as a starting point for your own astrological project.

## Features

- Dark UI with custom palette (Ink, Parchment, Sage, Gold)
- Animated aspect explorer with filter and sort controls
- Polarity ring score visualization (SVG-based)
- Resonance Bands: Bond Tone, Core Dynamic, Watch For
- Shareable report links encoded in the URL
- Works directly with the `v1/western/synastrycards` endpoint

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YourUsername/opensynastry.git
cd opensynastry
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
ASTRO_API_KEY=your_free_astro_api_key_here
```

You can get a free API key at [freeastroapi.com](http://freeastroapi.com).

### 4. Run locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). Enter two sets of birth details, click **Access Report**, and the synastry report will be generated and displayed.

## Project Structure

- **`app/page.tsx`** — Landing page with the input form
- **`app/report/page.tsx`** — Report page, decodes the `q` URL param and renders the full analysis
- **`lib/synastry-service.ts`** — Handles the external API call and transforms the response
- **`components/SummaryHeader.tsx`** — Renders the archetype, score ring, narrative, and Resonance Bands
- **`components/AspectExplorer.tsx`** — Filterable, sortable grid of planetary aspects
- **`components/RitualDrawer.tsx`** — Slide-in detail panel opened on clicking an aspect card

## Customizing the Theme

The color palette is defined as CSS variables in `app/globals.css`:

```css
@theme inline {
  --color-ink: #1a1614;
  --color-parchment: #f5f0e8;
  --color-gold: #c9a96e;
  --color-sage: #8b9a6b;
  --color-rose: #d4726a;
}
```

Changing these values will propagate throughout the entire UI.

## Contributing

Pull requests are welcome.

1. Fork the project
2. Create your branch (`git checkout -b feature/your-feature`)
3. Commit and push
4. Open a pull request

## Credits

Astrological data powered by [FreeAstroAPI.com](http://freeastroapi.com). Built with Next.js, Tailwind CSS v4, and Framer Motion.
