'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { Summary, DriverItem, Domain } from '@/lib/types';
import { normalizeScore, domainColor } from '@/lib/utils';

interface DomainScoresProps {
    summary: Summary;
}

const DOMAIN_LABELS: Record<string, string> = {
    romance: 'Romance',
    communication: 'Communication',
    stability: 'Stability',
    intimacy: 'Intimacy',
    growth: 'Growth',
    tension: 'Tension',
};

export default function DomainScores({ summary }: DomainScoresProps) {
    const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);

    const domainScores = useMemo(() => {
        return summary.scores.filter((s) => s.key !== 'overall');
    }, [summary.scores]);

    return (
        <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-parchment mb-10 text-center">
                    Domain Scores
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {domainScores.map((score, i) => {
                        const normalized = normalizeScore(score.value, score.key);
                        const color = domainColor(score.key);
                        const isTension = score.key === 'tension';
                        const drivers = summary.drivers_by_domain?.[score.key] ?? [];
                        const isHovered = hoveredDomain === score.key;

                        return (
                            <motion.div
                                key={score.key}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="card-surface p-4 flex flex-col items-center relative cursor-default"
                                onMouseEnter={() => setHoveredDomain(score.key)}
                                onMouseLeave={() => setHoveredDomain(null)}
                                role="group"
                                aria-label={`${DOMAIN_LABELS[score.key] ?? score.key}: ${Math.round(score.value)}`}
                            >
                                {/* Mini ring */}
                                <div className="relative w-16 h-16 mb-3">
                                    <svg viewBox="0 0 60 60" className="w-full h-full -rotate-90" aria-hidden="true">
                                        <circle
                                            cx="30"
                                            cy="30"
                                            r="24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="text-ink-mid"
                                        />
                                        <circle
                                            cx="30"
                                            cy="30"
                                            r="24"
                                            fill="none"
                                            stroke={color}
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeDasharray={`${normalized * 1.508} ${150.8 - normalized * 1.508}`}
                                            strokeDashoffset="0"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span
                                            className="font-[family-name:var(--font-display)] text-lg"
                                            style={{ color }}
                                        >
                                            {Math.round(score.value)}
                                        </span>
                                    </div>
                                </div>

                                <span className="text-xs text-parchment/60 text-center leading-tight">
                                    {DOMAIN_LABELS[score.key] ?? score.key}
                                </span>

                                {isTension && (
                                    <span className="text-[10px] text-parchment/30 mt-1">
                                        (higher = more)
                                    </span>
                                )}

                                {/* Driver chips on hover */}
                                {isHovered && drivers.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-20 bg-ink-light border border-ink-mid rounded-md p-3 shadow-xl min-w-[180px]"
                                    >
                                        <span className="text-[10px] text-parchment/35 uppercase tracking-wider block mb-2">
                                            Top Drivers
                                        </span>
                                        {drivers.slice(0, 3).map((d: DriverItem) => (
                                            <div
                                                key={d.key}
                                                className="text-xs text-parchment/60 py-0.5 flex justify-between"
                                            >
                                                <span className="truncate mr-2">{d.label}</span>
                                                <span className="text-parchment/30 shrink-0">
                                                    {d.contribution > 0 ? '+' : ''}
                                                    {d.contribution.toFixed(1)}
                                                </span>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
