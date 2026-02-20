'use client';

import { motion } from 'framer-motion';

interface HeroSectionProps {
    onCtaClick?: () => void;
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
    return (
        <section className="ambient-gradient relative overflow-hidden min-h-screen flex items-center justify-center px-6">
            {/* Decorative sigils */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
                <svg width="600" height="600" viewBox="0 0 600 600" fill="none" aria-hidden="true">
                    <circle cx="300" cy="300" r="250" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="300" cy="300" r="200" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="300" cy="300" r="150" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="300" y1="50" x2="300" y2="550" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="50" y1="300" x2="550" y2="300" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="123" y1="123" x2="477" y2="477" stroke="currentColor" strokeWidth="0.3" />
                    <line x1="477" y1="123" x2="123" y2="477" stroke="currentColor" strokeWidth="0.3" />
                </svg>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <span className="inline-block text-gold/70 text-xs uppercase tracking-[0.3em] mb-6">
                        Open Synastry
                    </span>

                    <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl text-parchment leading-[1.05] mb-6">
                        Reveal your{' '}
                        <span className="text-gold italic">connection</span>{' '}
                        archetype.
                    </h1>

                    <p className="text-parchment/55 text-lg sm:text-xl max-w-lg mx-auto leading-relaxed mb-10">
                        Understand the deeper pattern between you.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <button
                        onClick={onCtaClick}
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gold/10 border border-gold/30 rounded-sm text-gold hover:bg-gold/20 hover:border-gold/50 transition-all duration-300 cursor-pointer"
                    >
                        <span className="text-sm font-medium tracking-wide uppercase">
                            Get your free synastry report
                        </span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="group-hover:translate-x-1 transition-transform duration-200"
                            aria-hidden="true"
                        >
                            <path
                                d="M3 8h10M10 4l4 4-4 4"
                                stroke="currentColor"
                                strokeWidth="1.2"
                            />
                        </svg>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
