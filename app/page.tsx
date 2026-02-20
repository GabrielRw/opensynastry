'use client';

import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import AspectCardPreview from '@/components/AspectCardPreview';
import SynastryForm from '@/components/SynastryForm';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const scrollToForm = () => {
    const el = document.getElementById('vault-form');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection onCtaClick={scrollToForm} />

        {/* Form Section */}
        <section id="vault-form" className="py-24 px-6 bg-ink-mid/10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-gold/70 text-xs uppercase tracking-[0.3em] mb-4">
                Discover Your Connection
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-parchment mb-4">
                Analyze Your Synastry
              </h2>
              <p className="text-parchment/50">
                Enter the birth details for both partners to uncover the planetary dynamics shaping your relationship.
              </p>
            </div>

            <SynastryForm />
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-ink-mid to-transparent" />

        <HowItWorks />

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-ink-mid to-transparent" />

        <AspectCardPreview />

        {/* Footer */}
        <footer className="py-12 px-6 text-center">
          <p className="text-xs text-parchment/30">
            Open Synastry · Astrological compatibility, decoded.
            <br />
            <span className="opacity-60 mt-2 inline-block">
              Powered by <a href="http://freeastroapi.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors underline underline-offset-2">FreeAstroAPI.com</a>
            </span>
          </p>
        </footer>
      </main>
    </>
  );
}
