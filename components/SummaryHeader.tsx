'use client';

import { motion } from 'framer-motion';
import type { Summary, ReportPayload } from '@/lib/types';

interface SummaryHeaderProps {
    summary: Summary;
    payload?: ReportPayload;
}

export default function SummaryHeader({ summary, payload }: SummaryHeaderProps) {
    const overallScore = summary.scores.find((s) => s.key === 'overall');
    const overallValue = overallScore?.value ?? 0;

    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch (e) {
            return dateStr;
        }
    };

    return (
        <section className="ambient-gradient pt-24 pb-32 px-6 min-h-screen">
            <div className="max-w-3xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    {/* Archetype badge */}
                    <span className="inline-block text-xs text-gold/60 uppercase tracking-[0.3em] mb-4">
                        Connection Archetype
                    </span>

                    <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl text-parchment mb-3">
                        {summary.archetype.label}
                    </h1>

                    <p className="text-parchment/50 text-lg italic max-w-lg mx-auto mb-10">
                        {summary.archetype.one_liner}
                    </p>

                    {/* Birth Details */}
                    {payload && (
                        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 text-xs text-parchment/40 mb-12 font-mono">
                            <div className="flex flex-col items-center">
                                <span className="text-gold/50 text-[10px] uppercase tracking-widest mb-1">{payload.person_a.name || 'Person A'}</span>
                                <span>{payload.person_a.location.city}</span>
                                <span>{formatDate(payload.person_a.datetime)}</span>
                            </div>
                            <div className="hidden sm:block w-px bg-ink-mid" />
                            <div className="flex flex-col items-center">
                                <span className="text-gold/50 text-[10px] uppercase tracking-widest mb-1">{payload.person_b.name || 'Person B'}</span>
                                <span>{payload.person_b.location.city}</span>
                                <span>{formatDate(payload.person_b.datetime)}</span>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Overall score visualization */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex flex-col items-center"
                >
                    <div className="relative w-28 h-28 mb-3">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" aria-hidden="true">
                            {/* Background ring */}
                            <circle
                                cx="50"
                                cy="50"
                                r="42"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-ink-mid"
                            />
                            {/* Score ring */}
                            <circle
                                cx="50"
                                cy="50"
                                r="42"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                className="text-gold"
                                strokeLinecap="round"
                                strokeDasharray={`${overallValue * 2.64} ${264 - overallValue * 2.64}`}
                                strokeDashoffset="0"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-[family-name:var(--font-display)] text-3xl text-parchment">
                                {Math.round(overallValue)}
                            </span>
                        </div>
                    </div>
                    <span className="text-xs text-parchment/35 uppercase tracking-widest">
                        Overall
                    </span>
                </motion.div>

                {/* Narrative */}
                {summary.narrative && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-10 mb-12 text-sm text-parchment/45 max-w-xl mx-auto leading-relaxed"
                    >
                        {summary.narrative}
                    </motion.p>
                )}

                {/* Synastry Bands */}
                {summary.bands && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-12 pt-12 border-t border-ink-mid max-w-xl mx-auto"
                    >
                        <div className="space-y-3 text-left">
                            <div className="card-surface p-4 border-l-2 border-gold/40">
                                <span className="text-[10px] text-gold/60 uppercase tracking-[0.2em] block mb-1">
                                    Bond Tone
                                </span>
                                <p className="text-sm text-parchment/90 leading-relaxed">
                                    {summary.bands.theme}
                                </p>
                            </div>
                            <div className="card-surface p-4 border-l-2 border-sage/40">
                                <span className="text-[10px] text-sage/60 uppercase tracking-[0.2em] block mb-1">
                                    Core Dynamic
                                </span>
                                <p className="text-sm text-parchment/90 leading-relaxed">
                                    {summary.bands.core}
                                </p>
                            </div>
                            <div className="card-surface p-4 border-l-2 border-rose/40">
                                <span className="text-[10px] text-rose/60 uppercase tracking-[0.2em] block mb-1">
                                    Watch For
                                </span>
                                <p className="text-sm text-parchment/90 leading-relaxed">
                                    {summary.bands.shadow}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
