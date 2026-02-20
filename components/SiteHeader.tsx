'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SiteHeader() {
    return (
        <header className="absolute top-0 left-0 right-0 z-50 pointer-events-none">
            <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between pointer-events-auto">
                <Link href="/" className="group flex items-center gap-2">
                    <span
                        className="font-[family-name:var(--font-display)] text-lg tracking-tight text-parchment"
                    >
                        Open Synastry
                    </span>
                </Link>

            </div>
        </header>
    );
}
