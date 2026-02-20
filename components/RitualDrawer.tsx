'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import type { Aspect } from '@/lib/types';
import { getPolarityLean, formatPolarity, strengthLabel, domainColor } from '@/lib/utils';
import IntensityBars from './IntensityBars';

interface RitualDrawerProps {
    aspect: Aspect | null;
    onClose: () => void;
}

export default function RitualDrawer({ aspect, onClose }: RitualDrawerProps) {
    const [activeBlock, setActiveBlock] = useState<'supportive' | 'challenging'>('supportive');

    // Reset active block when aspect changes
    useEffect(() => {
        if (aspect) {
            setActiveBlock(aspect.default_block === 'challenging' ? 'challenging' : 'supportive');
        }
    }, [aspect]);

    const lean = aspect ? getPolarityLean(aspect.polarity_score) : 'balanced';

    return (
        <Dialog.Root open={!!aspect} onOpenChange={(open) => !open && onClose()}>
            <AnimatePresence>
                {aspect && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                className="fixed inset-0 z-50 drawer-overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            />
                        </Dialog.Overlay>

                        <Dialog.Content asChild>
                            <motion.div
                                className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-ink-light border-l border-ink-mid shadow-2xl overflow-y-auto"
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            >
                                <div className="p-6 sm:p-8">
                                    {/* Close button */}
                                    <div className="flex justify-end mb-6">
                                        <Dialog.Close className="text-parchment/30 hover:text-parchment transition-colors p-1">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                            <VisuallyHidden.Root>Close</VisuallyHidden.Root>
                                        </Dialog.Close>
                                    </div>

                                    <VisuallyHidden.Root>
                                        <Dialog.Title>Aspect Detail: {aspect.label}</Dialog.Title>
                                    </VisuallyHidden.Root>
                                    <Dialog.Description asChild>
                                        <VisuallyHidden.Root>
                                            Detailed view of the {aspect.label} aspect showing supportive and challenging perspectives.
                                        </VisuallyHidden.Root>
                                    </Dialog.Description>

                                    {/* Header */}
                                    <div className="mb-8">
                                        <span className="text-[10px] text-parchment/25 tracking-wider uppercase font-mono">
                                            #{aspect.rank} · {strengthLabel(aspect.strength)}
                                        </span>
                                        <h2 className="font-[family-name:var(--font-display)] text-3xl text-parchment mt-1 mb-2">
                                            {aspect.label}
                                        </h2>

                                        <div className="flex items-center gap-3 mb-4">
                                            <span
                                                className={`px-2 py-0.5 text-xs rounded-sm border ${lean === 'supportive'
                                                    ? 'bg-sage/10 border-sage/20 text-sage'
                                                    : lean === 'challenging'
                                                        ? 'bg-rose/10 border-rose/20 text-rose'
                                                        : 'bg-gold/10 border-gold/20 text-gold'
                                                    }`}
                                            >
                                                {lean}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-parchment/30 uppercase tracking-wider">Intensity</span>
                                                <IntensityBars score={aspect.polarity_score} />
                                            </div>
                                        </div>

                                        {/* Domain chips */}
                                        <div className="flex gap-2 flex-wrap">
                                            {aspect.domains.map((d) => (
                                                <span
                                                    key={d}
                                                    className="domain-chip"
                                                    style={{ color: domainColor(d) }}
                                                >
                                                    {d}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Polarity Toggle */}
                                    {aspect.display_policy === 'both_sides' && (
                                        <div className="flex mb-8 bg-ink/50 rounded-sm p-1 border border-ink-mid">
                                            <PolarityToggleButton
                                                label="Supportive"
                                                active={activeBlock === 'supportive'}
                                                onClick={() => setActiveBlock('supportive')}
                                                variant="supportive"
                                            />
                                            <PolarityToggleButton
                                                label="Challenging"
                                                active={activeBlock === 'challenging'}
                                                onClick={() => setActiveBlock('challenging')}
                                                variant="challenging"
                                            />
                                        </div>
                                    )}

                                    {/* Block content */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeBlock}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <BlockContent
                                                block={aspect.blocks[activeBlock]}
                                                variant={activeBlock}
                                            />
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* If single-side display, show the other side muted */}
                                    {aspect.display_policy !== 'both_sides' && (
                                        <div className="mt-8 pt-8 border-t border-ink-mid">
                                            <p className="text-xs text-parchment/20 mb-4 uppercase tracking-wider">
                                                {activeBlock === 'supportive' ? 'Challenging' : 'Supportive'} perspective
                                            </p>
                                            <BlockContent
                                                block={
                                                    aspect.blocks[
                                                    activeBlock === 'supportive' ? 'challenging' : 'supportive'
                                                    ]
                                                }
                                                variant={activeBlock === 'supportive' ? 'challenging' : 'supportive'}
                                                muted
                                            />
                                        </div>
                                    )}

                                    {/* Interpretation note */}
                                    <div className="mt-10 pt-6 border-t border-ink-mid">
                                        <p className="text-xs text-parchment/25 leading-relaxed">
                                            <span className="text-parchment/35">Interpretation note:</span>{' '}
                                            This aspect leans{' '}
                                            <span
                                                className={
                                                    lean === 'supportive'
                                                        ? 'text-sage/60'
                                                        : lean === 'challenging'
                                                            ? 'text-rose/60'
                                                            : 'text-gold/60'
                                                }
                                            >
                                                {lean}
                                            </span>{' '}
                                            with a polarity score of{' '}
                                            {aspect.polarity_score > 0 ? '+' : ''}
                                            {aspect.polarity_score.toFixed(2)}. Scores closer to zero indicate a more
                                            balanced dynamic.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
}

/* ─── Block Content ─── */

function BlockContent({
    block,
    variant,
    muted = false,
}: {
    block: { title: string; one_liner: string; insight: string };
    variant: 'supportive' | 'challenging';
    muted?: boolean;
}) {
    const accent = variant === 'supportive' ? 'text-sage' : 'text-rose';
    const opacity = muted ? 'opacity-40' : '';

    return (
        <div className={opacity}>
            <div className="flex items-center gap-2 mb-3">
                <span className={`w-1.5 h-1.5 rounded-full ${variant === 'supportive' ? 'bg-sage' : 'bg-rose'}`} aria-hidden="true" />
                <h3 className={`font-[family-name:var(--font-display)] text-lg ${accent}`}>
                    {block.title}
                </h3>
            </div>

            <p className="text-parchment/60 text-sm italic mb-4 leading-relaxed">
                &ldquo;{block.one_liner}&rdquo;
            </p>

            <p className="text-parchment/45 text-sm leading-relaxed">
                {block.insight}
            </p>
        </div>
    );
}

/* ─── Polarity Toggle Button ─── */

function PolarityToggleButton({
    label,
    active,
    onClick,
    variant,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
    variant: 'supportive' | 'challenging';
}) {
    const activeStyles =
        variant === 'supportive'
            ? 'bg-sage/15 text-sage border-sage/25'
            : 'bg-rose/15 text-rose border-rose/25';

    return (
        <button
            onClick={onClick}
            className={`flex-1 px-4 py-2 text-xs rounded-sm border transition-all duration-200
        ${active ? activeStyles : 'border-transparent text-parchment/35 hover:text-parchment/50'}`}
        >
            {label}
        </button>
    );
}
