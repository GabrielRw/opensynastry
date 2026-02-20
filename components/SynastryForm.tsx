'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CitySearch from './CitySearch';

interface PersonData {
    name: string;
    date: string;
    time: string;
    location: {
        city: string;
        country?: string;
        lat: number;
        lng: number;
        timezone?: string;
    } | null;
}

export default function SynastryForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<{ a: PersonData; b: PersonData }>({
        a: { name: '', date: '', time: '', location: null },
        b: { name: '', date: '', time: '', location: null },
    });
    const [step, setStep] = useState<1 | 2>(1);
    const [loading, setLoading] = useState(false);

    const handleUpdate = (person: 'a' | 'b', field: keyof PersonData, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [person]: { ...prev[person], [field]: value },
        }));
    };

    const handleCalculate = () => {
        // Detailed validation
        const errors: string[] = [];
        if (!formData.a.date) errors.push("Person A's birth date is missing");
        if (!formData.a.location) errors.push("Person A's birth city must be selected from the list");
        if (!formData.b.date) errors.push("Person B's birth date is missing");
        if (!formData.b.location) errors.push("Person B's birth city must be selected from the list");

        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        setLoading(true);

        const payload = {
            person_a: {
                name: formData.a.name,
                datetime: `${formData.a.date}T${formData.a.time || '12:00'}:00`,
                tz_str: formData.a.location!.timezone || 'UTC',
                location: {
                    city: formData.a.location!.city,
                    lat: formData.a.location!.lat,
                    lng: formData.a.location!.lng,
                },
            },
            person_b: {
                name: formData.b.name,
                datetime: `${formData.b.date}T${formData.b.time || '12:00'}:00`,
                tz_str: formData.b.location!.timezone || 'UTC',
                location: {
                    city: formData.b.location!.city,
                    lat: formData.b.location!.lat,
                    lng: formData.b.location!.lng,
                },
            },
        };

        // Encode payload (handling Unicode)
        const json = JSON.stringify(payload);
        // Helper to handle UTF-8 strings with btoa
        const utf8Bytes = encodeURIComponent(json).replace(/%([0-9A-F]{2})/g,
            (match, p1) => String.fromCharCode(parseInt(p1, 16)));
        const encoded = btoa(utf8Bytes);

        router.push(`/report?q=${encoded}`);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Tabs */}
            <div className="flex mb-8 border-b border-ink-mid relative">
                <button
                    onClick={() => setStep(1)}
                    className={`flex-1 px-6 py-3 text-center text-sm tracking-widest uppercase transition-colors ${step === 1 ? 'text-gold' : 'text-parchment/30 hover:text-parchment/60'
                        }`}
                >
                    Person A
                </button>
                <button
                    onClick={() => setStep(2)}
                    className={`flex-1 px-6 py-3 text-center text-sm tracking-widest uppercase transition-colors ${step === 2 ? 'text-gold' : 'text-parchment/30 hover:text-parchment/60'
                        }`}
                >
                    Person B
                </button>

                <motion.div
                    className="absolute bottom-0 h-0.5 bg-gold"
                    initial={false}
                    animate={{
                        left: step === 1 ? '0%' : '50%',
                        width: '50%'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
            </div>

            <div className="p-1 min-h-[300px]">
                {step === 1 ? (
                    <PersonInput
                        data={formData.a}
                        onChange={(field, val) => handleUpdate('a', field, val)}
                    />
                ) : (
                    <PersonInput
                        data={formData.b}
                        onChange={(field, val) => handleUpdate('b', field, val)}
                    />
                )}
            </div>

            <div className="mt-8 flex justify-between items-center">
                {step === 2 ? (
                    <button
                        onClick={() => setStep(1)}
                        className="text-xs text-parchment/40 hover:text-parchment uppercase tracking-wider"
                    >
                        ← Back
                    </button>
                ) : (
                    <div />
                )}

                {step === 1 ? (
                    <button
                        onClick={() => setStep(2)}
                        className="px-8 py-3 bg-ink-light border border-ink-mid hover:border-gold/50 text-parchment text-sm tracking-wide rounded-sm transition-all"
                    >
                        Next Person →
                    </button>
                ) : (
                    <button
                        onClick={handleCalculate}
                        disabled={loading}
                        className="px-8 py-3 bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 text-sm tracking-wide rounded-sm transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? 'Calculating...' : 'Access report'}
                    </button>
                )}
            </div>

        </div>
    );
}

function PersonInput({
    data,
    onChange,
}: {
    data: PersonData;
    onChange: (field: keyof PersonData, value: any) => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="space-y-1.5">
                <label className="block text-xs text-parchment/40 uppercase tracking-wider ml-1">
                    Name (Optional)
                </label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => onChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-ink-light rounded-sm border border-ink-mid text-parchment placeholder:text-parchment/20 focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="Enter name"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="block text-xs text-parchment/40 uppercase tracking-wider ml-1">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        value={data.date}
                        onChange={(e) => onChange('date', e.target.value)}
                        className="w-full px-4 py-3 bg-ink-light rounded-sm border border-ink-mid text-parchment placeholder:text-parchment/20 focus:outline-none focus:border-gold/50 transition-colors scheme-dark"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="block text-xs text-parchment/40 uppercase tracking-wider ml-1">
                        Time (Approx)
                    </label>
                    <input
                        type="time"
                        value={data.time}
                        onChange={(e) => onChange('time', e.target.value)}
                        className="w-full px-4 py-3 bg-ink-light rounded-sm border border-ink-mid text-parchment placeholder:text-parchment/20 focus:outline-none focus:border-gold/50 transition-colors scheme-dark"
                    />
                </div>
            </div>

            <CitySearch
                label="Place of Birth"
                onSelect={(city) => onChange('location', {
                    city: city.name,
                    country: city.country,
                    lat: city.lat,
                    lng: city.lng,
                    timezone: city.timezone
                })}
                value={data.location ? `${data.location.city}${data.location.country ? `, ${data.location.country}` : ''}` : undefined}
            />
        </motion.div>
    );
}
