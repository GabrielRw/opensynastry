import { SynastryResponse, Aspect, ScoreItem, DOMAINS } from '@/lib/types';

// Using the specialized Cards API which returns the exact shape we need
const EXTERNAL_API_URL = 'https://astro-api-1qnc.onrender.com/api/v1/western/synastrycards';

export async function fetchSynastryFromAPI(inputData: any): Promise<SynastryResponse> {
    const apiKey = process.env.ASTRO_API_KEY;
    if (!apiKey) {
        throw new Error('ASTRO_API_KEY is not configured');
    }

    const res = await fetch(EXTERNAL_API_URL, {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(inputData),
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        const errorText = await res.text().catch(() => '');
        throw new Error(`External API error: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    return transformCardsResponse(data);
}

function transformCardsResponse(data: any): SynastryResponse {
    const { summary, aspects, meta } = data;

    // Map scores object { romance: 80, ... } to ScoreItem[]
    const scores: ScoreItem[] = [];
    const validKeys = ['overall', ...DOMAINS];

    if (summary.scores) {
        validKeys.forEach(key => {
            if (typeof summary.scores[key] === 'number') {
                scores.push({
                    key,
                    value: summary.scores[key],
                });
            }
        });
    }

    // Map drivers/highlights if needed
    // The API returns 'drivers_by_domain' map.
    // Our frontend Summary type asks for 'strengths' and 'challenges' strings.
    // We can derive them from the top aspects.
    const strengthAspects = (aspects || []).filter((a: any) => a.polarity === 'supportive').slice(0, 3);
    const challengeAspects = (aspects || []).filter((a: any) => a.polarity === 'challenging').slice(0, 3);

    const strengths = strengthAspects.map((a: any) => a.key);
    const challenges = challengeAspects.map((a: any) => a.key);

    // Map drivers_by_domain (API returns keys, frontend wants DriverItem objects)
    const drivers_by_domain: Record<string, any[]> = {};
    if (summary.drivers_by_domain) {
        Object.entries(summary.drivers_by_domain).forEach(([domain, keys]) => {
            // keys is string[] or any[]
            if (Array.isArray(keys)) {
                drivers_by_domain[domain] = keys.map((k: string) => {
                    // Find aspect to get label and strength
                    // Note: API returns aspect keys as 'aspect.a_sun_trine_b_moon'
                    // aspects array has 'key' property matching this or 'pair_key'?
                    // Let's look up by key or id.
                    // Aspect in aspects array has 'key' which matches.
                    const found = (aspects || []).find((a: any) => a.key === k || a.aspect_id === k);
                    return {
                        key: k,
                        label: found?.label || k,
                        contribution: found?.strength ? Math.round(found.strength * 100) : 0,
                    };
                });
            }
        });
    }

    return {
        meta: {
            calculation: meta?.calculation || {},
            generated_at: meta?.generated_at || new Date().toISOString(),
            report_id: meta?.report_id || `rep_${Date.now()}`,
        },
        summary: {
            archetype: summary.archetype,
            scores,
            strengths,
            challenges,
            narrative: summary.narrative,
            drivers_by_domain,
        },
        aspects: aspects as Aspect[], // The shape matches per doc
    };
}
