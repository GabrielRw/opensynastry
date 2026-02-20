<div align="center">
  <h1>◈ Open Synastry</h1>
  <p>A beautifully crafted open-source frontend for building astrological synastry applications.</p>
</div>

<div align="center">
  <strong>Powered by <a href="http://freeastroapi.com">FreeAstroAPI.com</a></strong>
</div>

---

## 🌌 Overview

**Open Synastry** is a modern, responsive, and aesthetically stunning UI built with **Next.js** and **Tailwind CSS**. It is designed to consume astrological compatibility data specifically from the advanced Synastry endpoint provided by [FreeAstroAPI.com](http://freeastroapi.com).

This repository is fully open-source. Whether you're an astrologer looking for a slick white-label report generator, a developer eager to explore React animation patterns with Framer Motion, or just someone curious about astrology APIs, this repo gives you everything you need to start generating gorgeous synastry reports immediately.

## ✨ Features

- **Beautiful Aesthetic UI:** Deep, immersive dark mode featuring custom gradients (Ink, Parchment, Sage, Gold, and Rose), bringing real luxury to astrological data.
- **Smart Data Visualization:** Custom SVG polarity rings, clean "Resonance Bands", and beautiful, interactive cards.
- **Micro-Animations:** Fluid, tactile user interactions powered by Framer Motion.
- **Shareable Reports:** Generate links that encapsulate full payload data, so users can effortlessly share their precise connection reports.
- **Plug-and-Play with FreeAstroAPI:** Seamlessly integrates with the `v1/western/synastrycards` endpoint out-of-the-box.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YourUsername/opensynastry.git
cd opensynastry
```

### 2. Install dependencies

```bash
npm install
# or yarn install / pnpm install
```

### 3. Create your Environment Variables

You will need an API key from [FreeAstroAPI.com](http://freeastroapi.com).

Create a `.env.local` file in the root directory and add your key:

```env
ASTRO_API_KEY=your_free_astro_api_key_here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the vibrant home interface. From there, you can enter two sets of birth details and instantly jump into the gorgeously rendered Synastry Report page!

## 🧩 Architecture

- **`app/page.tsx`**: The majestic landing page featuring the SynastryForm and AspectPreview.
- **`app/report/page.tsx`**: The dynamic report viewer. It decodes the Base64 URL parameter (`q`), proxies a secure request through `lib/synastry-service.ts`, and gracefully surfaces the payload.
- **`components/SummaryHeader.tsx`**: Renders the overall composite score ring, the overarching narrative, and horizontal Resonance bands.
- **`components/AspectExplorer.tsx` & `AspectCard.tsx`**: An elegant, filterable grid visualization separating astrological aspects by rank and intensity, opening into detailed modal drawers (`RitualDrawer.tsx`).

## 🛠 Adapt & Customize

Open Synastry is designed to be easily skinnable. Inside `app/globals.css`, you will find intuitive CSS Custom Properties describing the entire sophisticated palette.

```css
@theme inline {
  --color-ink: #1a1614;
  --color-parchment: #f5f0e8;
  --color-gold: #c9a96e;
  ...
}
```

Want to build a bright and airy version? Just change the tokens here and watch the entire platform adapt smoothly.

## 🤝 Contributing

Contributions are entirely welcome—especially PRs extending report coverage to more astrological methodologies, or expanding the integration tightly into [FreeAstroAPI.com](http://freeastroapi.com)'s natal/transit libraries.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgements

- Astrological computations and aspect calculations proudly provided by [FreeAstroAPI.com](http://freeastroapi.com).
- Frontend constructed utilizing the powerful combination of Next.js, Tailwind v4, and Framer Motion. 

---
*Built with intention and code.*
