'use client';

export default function ReportActions() {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                }}
                className="px-8 py-3 bg-gold text-ink-dark text-xs uppercase tracking-widest hover:bg-gold/90 transition-colors duration-200"
            >
                Copy Link
            </button>
            <button
                onClick={() => {
                    if (navigator.share) {
                        navigator.share({
                            title: 'Open Synastry Report',
                            text: 'Explore our astrological connection!',
                            url: window.location.href,
                        }).catch(console.error);
                    } else {
                        window.open(window.location.href, '_blank');
                    }
                }}
                className="px-8 py-3 border border-ink-mid text-parchment text-xs uppercase tracking-widest hover:border-gold/50 hover:text-gold transition-colors duration-200"
            >
                Share Report
            </button>
        </div>
    );
}
