'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Aspect, Domain } from '@/lib/types';
import { DOMAINS } from '@/lib/types';
import { domainColor, strengthLabel, formatPolarity, getPolarityLean } from '@/lib/utils';
import RitualDrawer from './RitualDrawer';
import IntensityBars from './IntensityBars';

interface AspectExplorerProps {
    aspects: Aspect[];
}

type SortKey = 'rank' | 'abs_polarity';

export default function AspectExplorer({ aspects }: AspectExplorerProps) {
    const [filterDomain, setFilterDomain] = useState<Domain | 'all'>('all');
    const [sortBy, setSortBy] = useState<SortKey>('rank');
    const [selectedAspect, setSelectedAspect] = useState<Aspect | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const filtered = useMemo(() => {
        let list = [...aspects];

        if (filterDomain !== 'all') {
            list = list.filter((a) => a.domains.includes(filterDomain));
        }

        if (sortBy === 'rank') {
            list.sort((a, b) => a.rank - b.rank);
        } else {
            list.sort((a, b) => b.abs_polarity - a.abs_polarity);
        }

        return list;
    }, [aspects, filterDomain, sortBy]);

    const displayed = useMemo(() => {
        if (isExpanded) return filtered;

        // Smart Preview: Top 3 Supportive + Top 3 Challenging
        // Note: filtered is already sorted by the user's preference (rank or intensity).
        // We take the top ones from that sorted list that match the criteria.

        const supportive = filtered.filter(a => getPolarityLean(a.polarity_score) === 'supportive').slice(0, 3);
        const challenging = filtered.filter(a => getPolarityLean(a.polarity_score) === 'challenging').slice(0, 3);

        // If we have balanced aspects, they might be missed here unless we explicitly include them.
        // But "Top 3 Supportive/Challenging" is the request. 
        // Let's add top 2 balanced just in case, to avoid empty views if only balanced exist?
        // Or simply: if total < 6, just show all.

        if (filtered.length <= 6) return filtered;

        const combined = [...supportive, ...challenging];

        // Remove duplicates (unlikely unless aspect is both? Impossible)
        // Re-sort combined list
        if (sortBy === 'rank') {
            combined.sort((a, b) => a.rank - b.rank);
        } else {
            combined.sort((a, b) => b.abs_polarity - a.abs_polarity);
        }

        return combined;
    }, [filtered, isExpanded, sortBy]);

    return (
        <section className="py-16 px-6" id="explorer">
            <div className="max-w-4xl mx-auto">
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-parchment mb-8 text-center">
                    Aspect Explorer
                </h2>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                    {/* Domain filter */}
                    <div className="flex flex-wrap gap-2">
                        <FilterChip
                            label="All"
                            active={filterDomain === 'all'}
                            onClick={() => setFilterDomain('all')}
                        />
                        {DOMAINS.map((d) => (
                            <FilterChip
                                key={d}
                                label={d}
                                active={filterDomain === d}
                                onClick={() => setFilterDomain(d)}
                                color={domainColor(d)}
                            />
                        ))}
                    </div>

                    {/* Separator */}
                    <div className="h-5 w-px bg-ink-mid hidden sm:block" />

                    {/* Sort */}
                    <div className="flex gap-2">
                        <SortChip label="By Rank" active={sortBy === 'rank'} onClick={() => setSortBy('rank')} />
                        <SortChip label="By Intensity" active={sortBy === 'abs_polarity'} onClick={() => setSortBy('abs_polarity')} />
                    </div>
                </div>

                {/* Count */}
                <p className="text-xs text-parchment/30 text-center mb-6">
                    Showing {displayed.length} of {filtered.length} aspect{filtered.length !== 1 ? 's' : ''}
                </p>

                {/* Aspect cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence mode="popLayout">
                        {displayed.map((aspect) => (
                            <AspectCard
                                key={aspect.key}
                                aspect={aspect}
                                onClick={() => setSelectedAspect(aspect)}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Expand / Collapse Button */}
                {filtered.length > 6 && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="px-6 py-2.5 bg-ink-light border border-ink-mid hover:border-gold/30 text-parchment text-xs tracking-widest uppercase rounded-sm transition-all"
                        >
                            {isExpanded ? 'Show Less' : `View All ${filtered.length} Aspects`}
                        </button>
                    </div>
                )}

                {filtered.length === 0 && (
                    <p className="text-center text-parchment/30 text-sm py-12 italic">
                        No aspects match this filter.
                    </p>
                )}

                {/* Ritual Drawer */}
                <RitualDrawer
                    aspect={selectedAspect}
                    onClose={() => setSelectedAspect(null)}
                />
            </div>
        </section>
    );
}

/* ─── Aspect Card ─── */

export function AspectCard({ aspect, onClick }: { aspect: Aspect; onClick: () => void }) {
    const lean = getPolarityLean(aspect.polarity_score);
    const leanColor =
        lean === 'supportive' ? 'text-sage' : lean === 'challenging' ? 'text-rose' : 'text-gold';
    const leanBg =
        lean === 'supportive'
            ? 'bg-sage/10 border-sage/20'
            : lean === 'challenging'
                ? 'bg-rose/10 border-rose/20'
                : 'bg-gold/10 border-gold/20';

    const defaultBlock =
        aspect.default_block === 'supportive' ? aspect.blocks.supportive : aspect.blocks.challenging;

    return (
        <motion.button
            layout
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
            className="card-surface p-5 text-left hover:border-gold/30 transition-colors duration-200 w-full cursor-pointer group"
            aria-label={`View details for ${aspect.label}`}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 pr-2">
                    <h3 className="font-[family-name:var(--font-display)] text-lg text-parchment leading-snug group-hover:text-gold transition-colors duration-200">
                        {defaultBlock.title}
                    </h3>
                    <p className="text-[10px] text-parchment/30 uppercase tracking-widest mt-1">
                        {aspect.label}
                    </p>
                </div>
                <span className={`shrink-0 px-2 py-0.5 text-[10px] rounded-sm border ${leanBg} ${leanColor}`}>
                    {lean}
                </span>
            </div>

            {/* ... (in AspectCard) */}
            <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-parchment/40">{strengthLabel(aspect.strength)}</span>
                <div className="flex-1 h-px bg-ink-mid" />
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-parchment/30 uppercase tracking-wider">Intensity</span>
                    <IntensityBars score={aspect.polarity_score} />
                </div>
            </div>

            {/* One-liner from default block */}
            <p className="text-xs text-parchment/45 italic leading-relaxed mb-3 line-clamp-2">
                &ldquo;{defaultBlock.one_liner}&rdquo;
            </p>

            {/* Domain chips */}
            <div className="flex gap-1.5 flex-wrap">
                {aspect.domains.map((d) => (
                    <span key={d} className="domain-chip" style={{ color: domainColor(d) }}>
                        {d}
                    </span>
                ))}
            </div>

            {/* Both sides indicator */}
            {aspect.display_policy === 'both_sides' && (
                <div className="mt-3 text-[10px] text-parchment/20 flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="0.8" />
                        <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="0.6" />
                    </svg>
                    Both sides
                </div>
            )}
        </motion.button>
    );
}

/* ─── Filter / Sort Chips ─── */

function FilterChip({
    label,
    active,
    onClick,
    color,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
    color?: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 text-xs rounded-sm border transition-all duration-200 capitalize
        ${active
                    ? 'border-gold/40 bg-gold/10 text-gold'
                    : 'border-ink-mid text-parchment/40 hover:text-parchment/60 hover:border-parchment/20'
                }`}
            style={active && color ? { borderColor: `${color}60`, color, backgroundColor: `${color}15` } : undefined}
        >
            {label}
        </button>
    );
}

function SortChip({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 text-xs rounded-sm border transition-all duration-200
        ${active
                    ? 'border-lilac/40 bg-lilac/10 text-lilac'
                    : 'border-ink-mid text-parchment/40 hover:text-parchment/60 hover:border-parchment/20'
                }`}
        >
            {label}
        </button>
    );
}
