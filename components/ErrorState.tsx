'use client';

interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
}

export default function ErrorState({
    message = 'Something went wrong while loading the report.',
    onRetry,
}: ErrorStateProps) {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-md text-center">
                <div className="text-4xl mb-6 text-parchment/15" aria-hidden="true">
                    ◈
                </div>

                <h2 className="font-[family-name:var(--font-display)] text-2xl text-parchment mb-3">
                    The Vault is sealed
                </h2>

                <p className="text-sm text-parchment/45 mb-8 leading-relaxed">
                    {message}
                </p>

                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/30 rounded-sm text-gold text-sm hover:bg-gold/20 transition-all duration-200"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path
                                d="M11.5 7A4.5 4.5 0 112.91 4.5M2.5 1v4h4"
                                stroke="currentColor"
                                strokeWidth="1.2"
                            />
                        </svg>
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
}
