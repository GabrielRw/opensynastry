'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface City {
    name: string;
    country: string;
    lat: number;
    lng: number;
    timezone?: string;
}

interface CitySearchProps {
    label: string;
    onSelect: (city: City) => void;
    bgClass?: string;
    value?: string;
}

export default function CitySearch({ label, onSelect, bgClass = 'bg-ink-light', value }: CitySearchProps) {
    const [query, setQuery] = useState(value || '');

    useEffect(() => {
        if (value !== undefined) {
            setQuery(value);
        }
    }, [value]);
    const [results, setResults] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length < 3) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const res = await fetch(`/api/geo/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();

                const mappedResults = (data.results || []).map((c: any) => ({
                    ...c,
                    country: c.country || c.country_code || ''
                }));
                setResults(mappedResults);
                setIsOpen(true);
            } catch (err) {
                console.error('Search failed', err);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [query]);

    // Click outside to close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <label className="block text-xs text-parchment/40 uppercase tracking-wider mb-1.5 ml-1">
                {label}
            </label>
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    if (!isOpen && e.target.value.length >= 3) setIsOpen(true);
                }}
                placeholder="Search city..."
                className={`w-full px-4 py-3 rounded-sm border border-ink-mid text-parchment placeholder:text-parchment/20 focus:outline-none focus:border-gold/50 transition-colors ${bgClass}`}
            />

            {/* Loading indicator */}
            {loading && (
                <div className="absolute right-3 top-[34px]">
                    <div className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                </div>
            )}

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute z-50 left-0 right-0 mt-1 bg-ink border border-ink-mid shadow-xl rounded-sm max-h-60 overflow-y-auto"
                    >
                        {results.map((city, i) => (
                            <button
                                key={`${city.name}-${city.lat}-${i}`}
                                onClick={() => {
                                    onSelect({ ...city, timezone: (city as any).timezone });
                                    setQuery(`${city.name}${city.country ? `, ${city.country}` : ''}`);
                                    setIsOpen(false);
                                }}
                                className="w-full text-left px-4 py-3 hover:bg-ink-mid/50 transition-colors border-b border-ink-mid/50 last:border-0"
                            >
                                <div className="text-sm text-parchment">{city.name}</div>
                                <div className="text-xs text-parchment/40">{city.country} • {city.lat.toFixed(2)}, {city.lng.toFixed(2)}</div>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
