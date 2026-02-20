import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Open Synastry — Reveal Your Connection',
  description:
    'Discover the hidden patterns in your relationship through astrological synastry. A modern, intimate exploration of compatibility.',
  openGraph: {
    title: 'Open Synastry',
    description: 'Reveal your connection archetype.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <div className="relative min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
