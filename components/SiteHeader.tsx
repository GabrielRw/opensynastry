'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SiteHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
                <Link href="/" className="group flex items-center gap-2">
                    <motion.span
                        className="text-gold text-lg"
                        whileHover={{ rotate: 15 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        aria-hidden="true"
                    >
                        ◈
                    </motion.span>
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
