import { NextResponse } from 'next/server';
import { fetchSynastryFromAPI } from '@/lib/synastry-service';

export async function GET() {
    try {
        const payload = {
            person_a: {
                datetime: '1990-01-01T12:00:00',
                tz_str: 'Europe/Paris',
                location: { lat: 48.8566, lng: 2.3522, city: 'Paris' }
            },
            person_b: {
                datetime: '1990-01-01T12:00:00',
                tz_str: 'Europe/London',
                location: { lat: 51.5074, lng: -0.1278, city: 'London' }
            }
        };

        const data = await fetchSynastryFromAPI(payload);
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined
        }, { status: 500 });
    }
}
