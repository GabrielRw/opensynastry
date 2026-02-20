'use client';

import { motion } from 'framer-motion';

const steps = [
    {
        number: '01',
        title: 'Input',
        description: 'Birth charts are calculated and cross-referenced.',
        glyph: '☿',
    },
    {
        number: '02',
        title: 'Calculate',
        description: 'Aspects are scored, polarized, and domain-mapped.',
        glyph: '⚹',
    },
    {
        number: '03',
        title: 'Explore',
        description: 'Dive into strengths, tensions, and hidden patterns.',
        glyph: '◇',
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="font-[family-name:var(--font-display)] text-3xl text-parchment mb-16 text-center">
                    How it works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="card-surface p-6 relative"
                        >
                            <span className="absolute top-4 right-4 text-xs text-parchment/25 font-mono">
                                {step.number}
                            </span>

                            <div className="text-2xl mb-4 text-gold/60" aria-hidden="true">
                                {step.glyph}
                            </div>

                            <h3 className="font-[family-name:var(--font-display)] text-xl text-parchment mb-2">
                                {step.title}
                            </h3>

                            <p className="text-sm text-parchment/50 leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
