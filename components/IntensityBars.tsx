import { getPolarityLean } from '@/lib/utils';

interface IntensityBarsProps {
    score: number;
    className?: string;
}

export default function IntensityBars({ score, className = '' }: IntensityBarsProps) {
    const absScore = Math.abs(score);
    const lean = getPolarityLean(score);
    const colorClass = lean === 'supportive' ? 'bg-sage' : lean === 'challenging' ? 'bg-rose' : 'bg-gold';

    // 5 bars
    // 0-0.2: 1 bar
    // 0.2-0.4: 2 bars
    // 0.4-0.6: 3 bars
    // 0.6-0.8: 4 bars
    // 0.8-1.0: 5 bars
    const bars = 5;
    const filledBars = Math.ceil(absScore * bars) || 1; // at least 1 bar visible for any aspect

    return (
        <div className={`flex gap-0.5 ${className}`} aria-label={`Intensity: ${Math.round(absScore * 100)}%`}>
            {[...Array(bars)].map((_, i) => (
                <div
                    key={i}
                    className={`w-1 h-3 rounded-[1px] ${i < filledBars ? colorClass : 'bg-ink-mid/30'}`}
                />
            ))}
        </div>
    );
}
