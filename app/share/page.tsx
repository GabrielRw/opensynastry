import { redirect } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SharePoster from '@/components/SharePoster';
import { fetchSynastryFromAPI } from '@/lib/synastry-service';
import type { SynastryResponse } from '@/lib/types';

export const dynamic = 'force-dynamic';

interface SharePageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getReportData(q?: string | string[]): Promise<SynastryResponse | null> {
    if (!q || typeof q !== 'string') return null;

    try {
        const json = atob(q);
        const payload = JSON.parse(json);
        return await fetchSynastryFromAPI(payload);
    } catch (error) {
        console.error('Failed to parse or fetch report data:', error);
        return null;
    }
}

export default async function SharePage({ searchParams }: SharePageProps) {
    const { q: qRaw } = await searchParams;
    const q = typeof qRaw === 'string' ? qRaw : undefined;

    // If no data, redirect to home
    if (!q) {
        redirect('/');
    }

    const data = await getReportData(q);

    if (!data) {
        redirect('/');
    }

    return (
        <>
            <SiteHeader />
            <main className="pt-24 pb-16 px-6">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="font-[family-name:var(--font-display)] text-3xl text-parchment mb-3">
                            Share Your Reading
                        </h1>
                        <p className="text-sm text-parchment/45">
                            Copy the link or summary to share your connection archetype.
                        </p>
                    </div>

                    <SharePoster
                        archetype={data.summary.archetype}
                        scores={data.summary.scores}
                        narrative={data.summary.narrative}
                        strengths={data.summary.strengths}
                        challenges={data.summary.challenges}
                        qParam={q}
                    />
                </div>
            </main>
        </>
    );
}
