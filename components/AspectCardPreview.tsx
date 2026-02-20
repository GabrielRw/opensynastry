'use client';

import { motion } from 'framer-motion';

/**
 * A mini preview aspect card shown on the landing page.
 * Uses static data to demonstrate the card style.
 */
export default function AspectCardPreview() {
    return (
        <section className="py-20 px-6">
            <div className="max-w-2xl mx-auto text-center mb-12">
                <p className="text-xs text-gold/50 uppercase tracking-[0.2em] mb-3">
                    Preview
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-parchment/80">
                    Each connection is rendered as a card
                </h2>
            </div>

            <motion.div
                className="max-w-md mx-auto card-surface p-6 hover:border-gold/30 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {/* Rank badge */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0 pr-2">
                        <h3 className="font-[family-name:var(--font-display)] text-lg text-parchment leading-snug group-hover:text-gold transition-colors duration-200">
                            Emotional Warmth
                        </h3>
                        <p className="text-[10px] text-parchment/30 uppercase tracking-widest mt-1">
                            Moon Trine Venus
                        </p>
                    </div>
                    <span className="shrink-0 px-2 py-0.5 text-[10px] rounded-sm bg-sage/15 text-sage border border-sage/25">
                        Supportive
                    </span>
                </div>

                {/* Strength + polarity */}
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-parchment/40">Strong</span>
                    <div className="flex-1 h-px bg-ink-mid" />
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-parchment/30 uppercase tracking-wider">Intensity</span>
                        {/* Static intensity bar representation for preview */}
                        <div className="flex gap-0.5" aria-hidden="true">
                            <div className="w-1.5 h-3 rounded-full bg-sage" />
                            <div className="w-1.5 h-3 rounded-full bg-sage" />
                            <div className="w-1.5 h-3 rounded-full bg-sage" />
                            <div className="w-1.5 h-3 rounded-full bg-sage/20" />
                        </div>
                    </div>
                </div>

                {/* One-liner */}
                <p className="text-sm text-parchment/55 leading-relaxed mb-4 italic">
                    &ldquo;Emotional warmth flows naturally between you, creating a safe harbor for vulnerability.&rdquo;
                </p>

                {/* Domain chips */}
                <div className="flex gap-2 flex-wrap">
                    {['romance', 'intimacy'].map((d) => (
                        <span
                            key={d}
                            className="domain-chip"
                            style={{ color: d === 'romance' ? '#d4726a' : '#b07aab' }}
                        >
                            {d}
                        </span>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
