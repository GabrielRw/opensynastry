import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SummaryHeader from '@/components/SummaryHeader';
import ErrorState from '@/components/ErrorState';
import DomainScores from '@/components/DomainScores';
import StrengthsChallenges from '@/components/StrengthsChallenges';
import AspectExplorer from '@/components/AspectExplorer';
import SkeletonLoader from '@/components/SkeletonLoader';
import ReportActions from '@/components/ReportActions';
import { fetchSynastryFromAPI } from '@/lib/synastry-service';
import type { SynastryResponse, ReportPayload } from '@/lib/types';

export const dynamic = 'force-dynamic';

interface ReportPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getReportData(q?: string | string[]): Promise<{ data: SynastryResponse; payload: ReportPayload } | { error: string } | null> {
    if (!q || typeof q !== 'string') return { error: 'Missing query parameter' };

    try {
        // Use Buffer for decoding base64 in Node.js environment
        const json = Buffer.from(q, 'base64').toString('utf-8');
        const payload = JSON.parse(json) as ReportPayload;
        const data = await fetchSynastryFromAPI(payload);
        return { data, payload };
    } catch (error) {
        console.error('Report fetch error:', error);
        return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
}

export default async function ReportPage({ searchParams }: ReportPageProps) {
    const { q } = await searchParams;
    const result = await getReportData(q);

    // Initial check for completely missing result (e.g. missing param)
    if (!result || 'error' in result) {
        const msg = result && 'error' in result ? result.error : 'Invalid request';
        return (
            <main className="pt-0 pb-16 px-6 relative">
                <SiteHeader />
                <div className="pt-24">
                    <ErrorState message={msg} />
                </div>
            </main>
        );
    }

    const { data, payload } = result;

    return (
        <Suspense fallback={<SkeletonLoader />}>
            <ReportContent data={data} payload={payload} />
        </Suspense>
    );
}

function ReportContent({ data, payload }: { data: SynastryResponse; payload: ReportPayload }) {
    return (
        <main className="relative min-h-screen">
            <SiteHeader />
            {/* A) Summary Header */}
            <SummaryHeader summary={data.summary} payload={payload} />

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-ink-mid to-transparent" />

            {/* Domain Scores */}
            <DomainScores summary={data.summary} />

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-ink-mid to-transparent" />

            {/* B) Strengths & Challenges */}
            <StrengthsChallenges summary={data.summary} aspects={data.aspects} />

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-ink-mid to-transparent" />

            {/* C) Aspect Explorer */}
            <AspectExplorer aspects={data.aspects} />

            {/* Footer & Actions */}
            <footer className="py-16 px-6 text-center border-t border-ink-mid mt-16 max-w-4xl mx-auto">
                <div className="mb-12">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl text-parchment mb-4">Share this connection</h3>
                    <p className="text-sm text-parchment/60 mb-8 max-w-md mx-auto">
                        Invite the other person to explore this synastry report with you, or save the link for later.
                    </p>
                    <ReportActions />
                </div>
                <p className="text-xs text-parchment/30 mt-8">
                    Open Synastry · Report generated {new Date(data.meta.generated_at).toLocaleDateString()}
                    <br />
                    <span className="opacity-60 mt-2 inline-block">
                        Powered by <a href="http://freeastroapi.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors underline underline-offset-2">FreeAstroAPI.com</a>
                    </span>
                </p>
            </footer>
        </main>
    );
}
