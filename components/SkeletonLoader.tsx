export default function SkeletonLoader() {
    return (
        <div className="min-h-screen" aria-label="Loading report" role="status">
            {/* Header skeleton */}
            <div className="ambient-gradient py-32 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="skeleton w-32 h-3 mx-auto mb-6" />
                    <div className="skeleton w-80 h-12 mx-auto mb-4" />
                    <div className="skeleton w-64 h-5 mx-auto mb-10" />
                    <div className="skeleton w-28 h-28 mx-auto rounded-full" />
                </div>
            </div>

            {/* Domain scores skeleton */}
            <div className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="skeleton w-40 h-6 mx-auto mb-10" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="card-surface p-4 flex flex-col items-center">
                                <div className="skeleton w-16 h-16 rounded-full mb-3" />
                                <div className="skeleton w-16 h-3" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cards skeleton */}
            <div className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="skeleton w-48 h-6 mx-auto mb-8" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="card-surface p-5">
                                <div className="skeleton w-20 h-3 mb-3" />
                                <div className="skeleton w-48 h-5 mb-2" />
                                <div className="skeleton w-full h-3 mb-3" />
                                <div className="flex gap-2">
                                    <div className="skeleton w-16 h-5 rounded-full" />
                                    <div className="skeleton w-20 h-5 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <span className="sr-only">Loading synastry report…</span>
        </div>
    );
}
