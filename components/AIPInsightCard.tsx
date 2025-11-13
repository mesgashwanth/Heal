// components/AIPInsightCard.tsx
import React, { useState, useEffect, useRef } from 'react'; // ⭐️ 1. Import useRef
import type { Patient } from '../types';
import { ICONS } from '../constants';

interface AIPInsightCardProps {
    title: string;
    apiEndpoint: string;
    patient: Patient | null;
    visits: any[];
    icon: React.ReactNode;
    initialDelay?: number; // Prop to add a delay
}

// ... (formatInsightText function is unchanged) ...
const formatInsightText = (text: string) => {
    if (!text) return null;
    const renderMarkdownLine = (line: string) => {
        const parts = line.split('**');
        return parts.map((part, i) => {
            if (i % 2 === 1) {
                return <strong key={i}>{part}</strong>;
            }
            return <span key={i}>{part}</span>;
        });
    };
    return text
        .split('\n')
        .map((line, index) => {
            line = line.trim();
            if (line.startsWith('* ')) {
                const lineContent = line.substring(2);
                return (
                    <li key={index} className="ml-4 list-disc">
                        {renderMarkdownLine(lineContent)}
                    </li>
                );
            }
            if (line.length === 0) {
                return <br key={index} />;
            }
            return (
                <p key={index} className="mb-1">
                    {renderMarkdownLine(line)}
                </p>
            );
        });
};


export const AIPInsightCard: React.FC<AIPInsightCardProps> = ({
    title,
    apiEndpoint,
    patient,
    visits,
    icon,
    initialDelay = 0, // Add default value
}) => {
    const [insight, setInsight] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedAt, setGeneratedAt] = useState<string | null>(null);

    // ⭐️ 2. Add a ref to track the last fetched patient ID
    const fetchedPatientIdRef = useRef<string | null>(null);

    const fetchInsight = async () => {
        if (!patient || visits.length === 0) {
            setInsight('Please select a patient with visits to generate insights.');
            return;
        }

        // ⭐️ 3. Mark this patient ID as "being fetched"
        fetchedPatientIdRef.current = patient.PATIENT_ID;
        setIsLoading(true);
        setError(null);
        setInsight('');

        try {
            const response = await fetch(`https://healthgestbackend.onrender.com${apiEndpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patient, visits }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Failed to fetch AI insight from server.');
            }

            const data = await response.json();

            if (data.success) {
                setInsight(data.dietPlan || data.exercisePlan || 'No plan generated.');
                setGeneratedAt(new Date().toLocaleString());
            } else {
                throw new Error(data.error || 'Failed to generate insight.');
            }
        } catch (err: any) {
            console.error(`❌ ${title} Error:`, err.message);
            setError(err.message || 'An unknown error occurred.');
            setInsight('');
        } finally {
            setIsLoading(false);
        }
    };

    // ⭐️ 4. MODIFIED: This useEffect is now more robust
    useEffect(() => {
        // Only run if we have a patient and visits
        if (patient?.PATIENT_ID && visits.length > 0) {

            // ⭐️ 5. AND if we haven't already fetched for this patient ID
            if (patient.PATIENT_ID !== fetchedPatientIdRef.current) {

                if (initialDelay > 0) {
                    setIsLoading(true);
                    const timer = setTimeout(() => {
                        fetchInsight();
                    }, initialDelay);
                    return () => clearTimeout(timer);
                } else {
                    fetchInsight();
                }
            }
        }

        // ⭐️ 6. If the patient ID is null (e.g., no patient selected), clear the ref
        if (!patient?.PATIENT_ID) {
            fetchedPatientIdRef.current = null;
        }

    }, [patient, visits, initialDelay]); // ⭐️ Re-run if patient or visits change

    return (
        // ... (rest of your component is unchanged) ...
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4 flex flex-col h-[500px] overflow-hidden">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                    {icon}
                    <span className="ml-2">{title}</span>
                </h3>
            </div>

            <button
                onClick={fetchInsight} // This button lets the user manually override the ref check
                disabled={isLoading}
                className="mb-3 px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 flex items-center justify-center self-start"
            >
                <svg
                    className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m-15.357-2a8.001 8.001 0 0015.357 2m0 0H15"
                    />
                </svg>
                {isLoading ? 'Refreshing...' : 'Refresh Plan'}
            </button>

            <div className="flex-grow overflow-y-auto overflow-x-hidden p-2 bg-gray-50 rounded-md border border-gray-200 text-gray-700 text-sm">
                {isLoading && <p className="text-gray-500">Generating plan...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!isLoading && !error && (
                    <div className="prose prose-sm max-w-none">
                        {formatInsightText(insight)}
                    </div>
                )}
            </div>
            {generatedAt && !isLoading && !error && (
                <p className="text-xs text-gray-400 mt-2">
                    Generated by Gemini • {generatedAt}
                </p>
            )}
        </div>
    );
};