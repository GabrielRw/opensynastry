import { NextResponse } from 'next/server';
import { SynastryResponse, Aspect, Block, ScoreItem, DOMAINS } from '@/lib/types';

const EXTERNAL_API_URL = 'https://astro-api-1qnc.onrender.com/api/v1/western/synastry';
const API_KEY = process.env.ASTRO_API_KEY;

// Default data for testing GET requests
const DEFAULT_BODY = {
    person_a: {
        datetime: '1990-06-15T10:00:00',
        tz_str: 'Europe/Paris',
        location: { lat: 48.8566, lng: 2.3522, city: 'Paris' },
    },
    person_b: {
        datetime: '1993-03-20T14:30:00',
        tz_str: 'Europe/London',
        location: { lat: 51.5074, lng: -0.1278, city: 'London' },
    },
};

export async function GET() {
    return handleRequest(DEFAULT_BODY);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        return handleRequest(body);
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
}

async function handleRequest(inputData: any) {
    if (!API_KEY) {
        return NextResponse.json({ error: 'Server config error: API Key missing' }, { status: 500 });
    }

    // Merge settings to ensure we get text and scores
    const payload = {
        ...inputData,
        settings: {
            ...inputData.settings,
            aspect_set: 'major',
            include: {
                scores: true,
                archetype: true,
                text: true,
                aspects: true,
                synastry_bands: true,
                house_overlays: false, // Keep it lighter for now
            },
        },
    };

    try {
        const res = await fetch(EXTERNAL_API_URL, {
            method: 'POST',
            headers: {
                'x-api-key': API_KEY, // Note: Render might be case-sensitive or insensitive, trying strictly standard
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('API Error:', res.status, errorText);
            return NextResponse.json({ error: 'External API error', details: errorText }, { status: res.status });
        }

        const data = await res.json();
        const transformed = transformResponse(data);

        return NextResponse.json(transformed);

    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

function transformResponse(data: any): SynastryResponse {
    const syn = data.synastry;
    const textDict = data.text?.by_key || {};

    // 1. Map Scores
    // syn.scores has keys like 'overall', 'romance', ... and 'contributors'
    const scores: ScoreItem[] = [];
    const validKeys = ['overall', ...DOMAINS];

    if (syn.scores) {
        validKeys.forEach(key => {
            if (typeof syn.scores[key] === 'number') {
                scores.push({
                    key,
                    value: syn.scores[key],
                });
            }
        });
    }

    // 2. Map Aspects
    const aspects: Aspect[] = (syn.aspects || []).map((raw: any) => {
        const textData = textDict[raw.text_key] || {};

        // Construct blocks (API returns single text, we put it in the matching polarity block)
        const blockContent: Block = {
            title: textData.title || raw.text_key,
            one_liner: textData.summary || 'No summary available.',
            insight: textData.detail || textData.description || 'No detailed insight available.',
        };

        // We populate both for safety, or flip them based on polarity
        // If polarity is 'challenging', the text is likely challenging.
        const isChallenging = raw.polarity === 'challenging' || raw.polarity === 'friction';

        return {
            key: raw.pair_key || raw.id,
            aspect_id: raw.id,
            label: raw.label || textData.title || 'Unknown Aspect', // Fallback
            rank: Math.round(raw.strength * 100), // Map 0-1 to 0-100 for ranking
            strength: raw.strength_label || 'moderate',
            strength_value: raw.strength,
            polarity: raw.polarity || 'neutral',
            polarity_score: isChallenging ? -raw.strength : raw.strength, // Approximation
            abs_polarity: raw.strength,
            dominant: raw.strength > 0.8 ? 'true' : 'false',
            domains: raw.domains || [],
            display_policy: 'show',
            default_block: isChallenging ? 'challenging' : 'supportive',
            blocks: {
                supportive: isChallenging ? { ...blockContent, title: 'Growth Opportunity' } : blockContent,
                challenging: !isChallenging ? { ...blockContent, title: 'Potential Friction' } : blockContent,
            },
        } as Aspect;
    });

    // 3. Highlights (Strengths/Challenges)
    // We can filter aspects by rank/polarity if syn.highlights is just refs
    // syn.highlights = [{ kind: 'aspect', ref_id: '...', ... }]
    // We'll just take top 3 supportive and top 3 challenging from our sorted aspects
    const sortedAspects = [...aspects].sort((a, b) => (b.strength_value || 0) - (a.strength_value || 0));

    const strengthAspects = sortedAspects.filter(a => a.polarity === 'supportive' || a.polarity === 'easy').slice(0, 3);
    const challengeAspects = sortedAspects.filter(a => a.polarity === 'challenging' || a.polarity === 'friction').slice(0, 3);

    const strengths = strengthAspects.map(a => a.blocks.supportive.title || a.label);
    const challenges = challengeAspects.map(a => a.blocks.challenging.title || a.label);

    return {
        meta: {
            calculation: {
                zodiac: data.meta?.settings_resolved?.zodiac || 'tropical',
                house_system: data.meta?.settings_resolved?.house_system || 'placidus',
            },
            generated_at: data.meta?.generated_at || new Date().toISOString(),
            report_id: `rep_${Date.now()}`,
        },
        summary: {
            archetype: {
                label: syn.archetype?.label || 'Cosmic Duo',
                confidence: syn.archetype?.confidence || 0.5,
                one_liner: syn.archetype?.one_liner || 'A unique connection.',
            },
            scores,
            strengths,
            challenges,
            narrative: syn.archetype?.one_liner || '',
            bands: syn.bands,
        },
        aspects,
    };
}
