'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { Summary, Aspect } from '@/lib/types';
import { mapKeyToAspect, domainColor } from '@/lib/utils';
import { AspectCard } from './AspectExplorer';
import RitualDrawer from './RitualDrawer';

interface StrengthsChallengesProps {
    summary: Summary;
    aspects: Aspect[];
}

export default function StrengthsChallenges({ summary, aspects }: StrengthsChallengesProps) {
    const [selectedAspect, setSelectedAspect] = useState<Aspect | null>(null);

    const strengths = useMemo(
        () =>
            summary.strengths
                .map((key) => mapKeyToAspect(key, aspects))
                .filter((a): a is Aspect => a !== undefined),
        [summary.strengths, aspects]
    );

    const challenges = useMemo(
        () =>
            summary.challenges
                .map((key) => mapKeyToAspect(key, aspects))
                .filter((a): a is Aspect => a !== undefined),
        [summary.challenges, aspects]
    );

    return (
        <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Strengths */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-2 h-2 rounded-full bg-sage" aria-hidden="true" />
                            <h2 className="font-[family-name:var(--font-display)] text-xl text-parchment">
                                Strengths
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {strengths.map((aspect) => (
                                <AspectCard
                                    key={aspect.key}
                                    aspect={aspect}
                                    onClick={() => setSelectedAspect(aspect)}
                                />
                            ))}
                            {strengths.length === 0 && (
                                <p className="text-sm text-parchment/30 italic">No strengths identified.</p>
                            )}
                        </div>
                    </div>

                    {/* Challenges */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-2 h-2 rounded-full bg-rose" aria-hidden="true" />
                            <h2 className="font-[family-name:var(--font-display)] text-xl text-parchment">
                                Challenges
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {challenges.map((aspect) => (
                                <AspectCard
                                    key={aspect.key}
                                    aspect={aspect}
                                    onClick={() => setSelectedAspect(aspect)}
                                />
                            ))}
                            {challenges.length === 0 && (
                                <p className="text-sm text-parchment/30 italic">No challenges identified.</p>
                            )}
                        </div>
                    </div>
                </div>

                <RitualDrawer
                    aspect={selectedAspect}
                    onClose={() => setSelectedAspect(null)}
                />
            </div>
        </section>
    );
}
