'use client';

import { useState, useCallback } from 'react';
import type { Archetype, ScoreItem } from '@/lib/types';
import { domainColor } from '@/lib/utils';

interface SharePosterProps {
    archetype: Archetype;
    scores: ScoreItem[];
    narrative: string;
    strengths: string[];
    challenges: string[];
    qParam: string;
}

export default function SharePoster({
    archetype,
    scores,
    narrative,
    strengths,
    challenges,
    qParam,
}: SharePosterProps) {
    const [copied, setCopied] = useState<'link' | 'text' | null>(null);

    const overallScore = scores.find((s) => s.key === 'overall')?.value ?? 0;
    const domainScores = scores.filter((s) => s.key !== 'overall');

    const summaryText = [
        `✦ ${archetype.label}`,
        `"${archetype.one_liner}"`,
        '',
        `Overall Score: ${Math.round(overallScore)}`,
        ...domainScores.map((s) => `${s.key}: ${Math.round(s.value)}`),
        '',
        narrative,
        '',
        `Strengths: ${strengths.join(', ')}`,
        `Challenges: ${challenges.join(', ')}`,
        '',
        '— Open Synastry',
    ].join('\n');

    const handleCopyLink = useCallback(() => {
        // Point to /report not /share, so people see the full report first
        const url = typeof window !== 'undefined'
            ? `${window.location.origin}/report?q=${qParam}`
            : '';

        navigator.clipboard.writeText(url).then(() => {
            setCopied('link');
            setTimeout(() => setCopied(null), 2000);
        });
    }, [qParam]);

    const handleCopyText = useCallback(() => {
        navigator.clipboard.writeText(summaryText).then(() => {
            setCopied('text');
            setTimeout(() => setCopied(null), 2000);
        });
    }, [summaryText]);

    return (
        <div>
            {/* Poster card */}
            <div className="card-surface p-8 sm:p-10 mb-8">
                {/* Top decorative line */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-ink-mid" />
                    <span className="text-gold/40 text-xs">◈</span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-ink-mid" />
                </div>

                {/* Archetype */}
                <div className="text-center mb-8">
                    <span className="text-[10px] text-parchment/25 uppercase tracking-[0.3em] block mb-3">
                        Connection Archetype
                    </span>
                    <h2 className="font-[family-name:var(--font-display)] text-4xl text-parchment mb-2">
                        {archetype.label}
                    </h2>
                    <p className="text-sm text-parchment/45 italic max-w-sm mx-auto">
                        &ldquo;{archetype.one_liner}&rdquo;
                    </p>
                </div>

                {/* Overall score */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-20 h-20">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" aria-hidden="true">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-mid" />
                            <circle
                                cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="3"
                                className="text-gold" strokeLinecap="round"
                                strokeDasharray={`${overallScore * 2.64} ${264 - overallScore * 2.64}`}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-[family-name:var(--font-display)] text-2xl text-parchment">
                                {Math.round(overallScore)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Domain scores as compact grid */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {domainScores.map((s) => (
                        <div key={s.key} className="text-center py-2 border border-ink-mid rounded-sm">
                            <span className="text-xs capitalize block mb-1" style={{ color: domainColor(s.key) }}>
                                {s.key}
                            </span>
                            <span className="font-[family-name:var(--font-display)] text-lg text-parchment">
                                {Math.round(s.value)}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Narrative */}
                <p className="text-sm text-parchment/40 text-center leading-relaxed mb-8">
                    {narrative}
                </p>

                {/* Bottom decorative line */}
                <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-ink-mid" />
                    <span className="text-xs text-parchment/15 tracking-widest uppercase">
                        Open Synastry
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-ink-mid" />
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 justify-center">
                <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold/10 border border-gold/30 rounded-sm text-gold text-sm hover:bg-gold/20 transition-all duration-200"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M6 8l2-2M5.5 9.5l-1 1a2.12 2.12 0 01-3-3l1-1M8.5 4.5l1-1a2.12 2.12 0 013 3l-1 1" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    {copied === 'link' ? 'Copied!' : 'Copy Link'}
                </button>

                <button
                    onClick={handleCopyText}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-lilac/10 border border-lilac/30 rounded-sm text-lilac text-sm hover:bg-lilac/20 transition-all duration-200"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <rect x="4" y="4" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M10 4V3a1 1 0 00-1-1H3a1 1 0 00-1 1v6a1 1 0 001 1h1" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    {copied === 'text' ? 'Copied!' : 'Copy Summary'}
                </button>
            </div>
        </div>
    );
}
