// src/components/ProbabilityBars.tsx
import React from 'react';

// Helper component for the bar itself
const ProgressBar: React.FC<{ label: string; percentage: number }> = ({ label, percentage }) => {
    const percentLabel = `${Math.round(percentage * 100)}%`;
    return (
        <div className="mb-3 last:mb-0">
            <div className="flex justify-between mb-1">
                <span className="text-lg font-medium text-gray-700">{label}</span>
                {/* ⭐️ CHANGED: text-yellow-500 to text-blue-500 */}
                <span className="text-lg font-medium text-blue-500">{percentLabel}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                {/* ⭐️ CHANGED: bg-yellow-400 to bg-blue-400 */}
                <div
                    className="bg-blue-400 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: percentLabel }}
                ></div>
            </div>
        </div>
    );
};

// Main component for the card
interface ProbabilityBarsProps {
    title: string;
    // Accepts an object like { Normal: 0.52, CSection: 0.48 }
    probabilities: { [key: string]: number } | undefined;
}

export const ProbabilityBars: React.FC<ProbabilityBarsProps> = ({ title, probabilities }) => {
    if (!probabilities) {
        return null; // Don't render if no data
    }

    // Formats labels like "MortalityRisk" -> "Mortality Risk"
    const formatLabel = (key: string) =>
        key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

    // Rename "FullTerm" to "Matured" to match your screenshot
    const renameLabel = (key: string) => {
        if (key === 'FullTerm') return 'Matured';
        return formatLabel(key);
    }

    const probabilityEntries = Object.entries(probabilities);

    return (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 p-4 border-b border-gray-200">
                {title}
            </h3>
            <div className="p-4">
                {probabilityEntries.length > 0 ? (
                    probabilityEntries.map(([key, value]) => (
                        <ProgressBar
                            key={key}
                            label={renameLabel(key)} // Use the renamed label
                            percentage={value}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">Probability data is not available.</p>
                )}
            </div>
        </div>
    );
};