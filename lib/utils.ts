import { Aspect, Domain } from './types';

/**
 * Find an aspect by its key in the aspects array.
 */
export function mapKeyToAspect(key: string, aspects: Aspect[]): Aspect | undefined {
    return aspects.find((a) => a.key === key);
}

/**
 * Get a human‑readable lean label from a polarity score.
 * Thresholds: >= 0.35 supportive, <= -0.35 challenging, else balanced.
 */
export function getPolarityLean(score: number): 'supportive' | 'challenging' | 'balanced' {
    if (score >= 0.35) return 'supportive';
    if (score <= -0.35) return 'challenging';
    return 'balanced';
}

/**
 * Color tokens for each domain.
 */
const DOMAIN_COLORS: Record<Domain, string> = {
    romance: '#d4726a',
    communication: '#7aa2d4',
    stability: '#8b9a6b',
    intimacy: '#b07aab',
    growth: '#c9a96e',
    tension: '#c97a5a',
};

export function domainColor(domain: string): string {
    return DOMAIN_COLORS[domain as Domain] ?? '#9b8ec4';
}

/**
 * Small inline SVG glyphs for each domain.
 */
export function domainGlyph(domain: string): string {
    const glyphs: Record<string, string> = {
        romance: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 12.5S1.5 8.5 1.5 5a2.75 2.75 0 015.5 0 2.75 2.75 0 015.5 0c0 3.5-5.5 7.5-5.5 7.5z" stroke="currentColor" stroke-width="1.2"/></svg>`,
        communication: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3h10v7H5L2 12V3z" stroke="currentColor" stroke-width="1.2"/></svg>`,
        stability: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5L12.5 12H1.5L7 1.5z" stroke="currentColor" stroke-width="1.2"/></svg>`,
        intimacy: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.2"/><circle cx="7" cy="7" r="2" stroke="currentColor" stroke-width="1"/></svg>`,
        growth: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 12V5M7 5C7 3 5 1.5 3 2.5M7 5C7 3 9 1.5 11 2.5" stroke="currentColor" stroke-width="1.2"/></svg>`,
        tension: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2v10" stroke="currentColor" stroke-width="1.2"/><path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" stroke-width="0.8" opacity="0.5"/></svg>`,
    };
    return glyphs[domain] ?? '';
}

/**
 * Get the display score for a domain.
 * Just clamps the value between 0 and 100 so the visual circle
 * matches the displayed integer score.
 */
export function normalizeScore(value: number, domain: string): number {
    return Math.max(0, Math.min(100, value));
}

/**
 * Strength label display.
 */
export function strengthLabel(strength: string): string {
    const labels: Record<string, string> = {
        very_strong: 'Very Strong',
        strong: 'Strong',
        moderate: 'Moderate',
        mild: 'Mild',
        weak: 'Weak',
    };
    return labels[strength] ?? strength;
}

/**
 * Clamp a number between min and max.
 */
export function clamp(n: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, n));
}

/**
 * Format polarity score as a percentage string.
 */
export function formatPolarity(score: number): string {
    const pct = Math.round(Math.abs(score) * 100);
    return `${pct}%`;
}
