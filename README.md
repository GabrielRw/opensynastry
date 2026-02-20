# Open Synastry

A modern, editorial-style synastry report web app built with Next.js 14+, Tailwind CSS, Framer Motion, and Radix UI.

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Environment Variables

Create a `.env.local` file in the project root:

```bash
ASTRO_API_KEY=your_api_key_here
```

> **Security**: The API key is only used server-side. It is never exposed to the client bundle.

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Routes

| Route | Description |
|---|---|
| `/` | Landing page with hero, how-it-works, and card preview |
| `/report` | Full synastry report with summary, domain scores, strengths/challenges, and aspect explorer |
| `/share` | Poster-like share page with copy link/text |
| `/api/synastry` | Server-side proxy to the external API (secure) |

## Project Structure

```
app/
  page.tsx              # Landing page
  layout.tsx            # Root layout
  globals.css           # Design system + Tailwind tokens
  api/synastry/route.ts # Secure API proxy
  report/
    page.tsx            # Report page (RSC)
    loading.tsx         # Skeleton loader
    error.tsx           # Error boundary
  share/
    page.tsx            # Share page
components/
  SiteHeader.tsx        # Navigation header
  HeroSection.tsx       # Landing hero
  HowItWorks.tsx        # 3-step explanation
  AspectCardPreview.tsx  # Landing card preview
  SummaryHeader.tsx     # Archetype + overall score
  DomainScores.tsx      # 6 domain mini-rings
  StrengthsChallenges.tsx # Top strengths/challenges
  AspectExplorer.tsx    # Filterable aspect grid
  RitualDrawer.tsx      # Aspect detail drawer
  SharePoster.tsx       # Share poster layout
  SkeletonLoader.tsx    # Loading skeleton
  ErrorState.tsx        # Error state
lib/
  types.ts              # TypeScript interfaces
  utils.ts              # Utility functions
  fetcher.ts            # Server + client fetchers
```

## Design

- **Palette**: Deep ink (#1a1614), parchment (#f5f0e8), muted gold (#c9a96e), lilac (#9b8ec4)
- **Typography**: Instrument Serif (display) + Inter (body)
- **Aesthetic**: Editorial, occult-inspired, minimal micro-interactions
- **Accessibility**: Keyboard navigation, reduced motion support, semantic HTML, good contrast

## Deploy on Vercel

1. Push to GitHub
2. Import in Vercel
3. Set `ASTRO_API_KEY` in Vercel Environment Variables
4. Deploy
