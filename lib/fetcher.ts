import { SynastryResponse } from './types';





/**
 * Client-side: Fetch synastry data from the local proxy route.
 */
export async function fetchSynastryFromProxy(): Promise<SynastryResponse> {
    const res = await fetch('/api/synastry', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) {
        const body = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(body.error ?? `Request failed with status ${res.status}`);
    }

    return res.json();
}
