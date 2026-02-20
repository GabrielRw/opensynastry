import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = 'https://astro-api-1qnc.onrender.com/api/v1/geo/search';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
        return NextResponse.json({ results: [] });
    }

    const apiKey = process.env.ASTRO_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    try {
        const res = await fetch(`${EXTERNAL_API_URL}?q=${encodeURIComponent(query)}&limit=10`, {
            headers: {
                'x-api-key': apiKey,
                'Accept': 'application/json',
            },
        });

        if (!res.ok) {
            return NextResponse.json({ results: [] }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Geo search error:', error);
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}
