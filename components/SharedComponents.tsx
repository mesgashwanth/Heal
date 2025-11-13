// src/components/SharedComponents.tsx
import React, { ReactNode } from 'react';
import type { HomeKpiData, KpiData, KpiStatus } from '../types.ts';


// --- HomeKpiCard (Enhanced with better styling) ---
export const HomeKpiCard: React.FC<{ data: HomeKpiData }> = ({ data }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-4">
            <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white shadow-md">
                <div className="text-xl">
                    {data.icon}
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-2xl font-bold text-gray-900 truncate">{data.value}</div>
                <div className="text-base font-medium text-gray-500 truncate">{data.title}</div>
            </div>
        </div>
    );
};

// --- Loading Skeleton for Home KPI Card ---
export const KpiCardSkeleton: React.FC = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center space-x-4 animate-pulse">
        <div className="flex-shrink-0 p-3 bg-gray-200 rounded-full w-12 h-12"></div>
        <div className="flex-1 min-w-0">
            <div className="h-7 bg-gray-300 rounded w-16 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
    </div>
);

// --- Visual Indicator Components ---

// Progress Bar Component
interface ProgressBarProps {
    value: number;
    max: number;
    color: string;
    label: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, color, label }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;

    return (
        <div className="w-full">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{label}</span>
                <span>{value} / {max}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                    className={`h-3 rounded-full transition-all duration-500 ${color}`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

// Gauge Component
interface GaugeProps {
    value: number;
    max: number;
    title: string;
    color: string;
}

export const Gauge: React.FC<GaugeProps> = ({ value, max, title, color }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
                    <div
                        className="absolute inset-0 rounded-full border-8 border-transparent"
                        style={{
                            borderTopColor: color,
                            borderRightColor: color,
                            transform: `rotate(${45 + (percentage * 1.8)}deg)`,
                            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                        }}
                    ></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{Math.round(percentage)}%</span>
                </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
                {value} of {max}
            </div>
        </div>
    );
};

// Stats Card Component
interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle, trend }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-900">{value}</span>
                {trend && (
                    <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
                    </span>
                )}
            </div>
            {subtitle && (
                <p className="text-sm text-gray-600 mt-2">{subtitle}</p>
            )}
        </div>
    );
};


// --- KpiCard (For Patient Dashboard) ---
interface DashboardKpiCardProps {
    data: KpiData;
    isHighlighted?: boolean;
    status?: KpiStatus;
}

export const DashboardKpiCard: React.FC<DashboardKpiCardProps> = ({ data, isHighlighted = false, status = 'stable' }) => {
    const { title, value, unit, change, changeType, icon } = data;

    const changeColors = {
        increase: 'text-green-500',
        decrease: 'text-red-500',
        stable: 'text-gray-500',
    };

    const statusClasses = {
        stable: 'border-gray-200',
        positive: 'border-green-500',
        negative: 'border-red-500',
        critical: 'border-red-500 bg-red-50',
    };

    const backgroundAndBorderClasses = isHighlighted
        ? 'bg-white border-indigo-600' // White bg, indigo border
        : `bg-white ${statusClasses[status]}`;

    return (
        <div className={`shadow-sm rounded-lg p-4 border-2 ${backgroundAndBorderClasses}`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-500">{title}</h3>
                <span className="text-gray-400">{icon}</span>
            </div>
            <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-bold text-gray-900">{value}</span>
                <span className="text-lg font-medium text-gray-500">{unit}</span>
            </div>
            {change && (
                <div className={`text-base font-medium ${changeColors[changeType || 'stable']}`}>
                    {change} in last week
                </div>
            )}
        </div>
    );
};

// --- ProfileItem (For Patient Dashboard lists) ---
interface ProfileItemProps {
    icon: ReactNode;
    label: string;
    value: string | number | undefined;
    tooltip?: string;
}

export const ProfileItem: React.FC<ProfileItemProps> = ({ icon, label, value, tooltip }) => {
    return (
        <div
            className="flex items-center justify-between py-3 px-1 border-b border-gray-100 last:border-b-0"
            title={tooltip}
        >
            <div className="flex items-center space-x-3">
                <span className="text-gray-400">{icon}</span>
                {/* --- ⭐️ CHANGED: text-gray-500 to text-slate-700 --- */}
                <span className="text-lg font-medium text-slate-700">{label}</span>
            </div>
            <span className="text-lg font-semibold text-gray-900 text-right">
                {value || 'N/A'}
            </span>
        </div>
    );
};

// --- GroupCard (For Patient Dashboard) ---
export const GroupCard: React.FC<{ title: string; children: ReactNode }> = ({ title, children }) => {
    return (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 p-4 border-b border-gray-200">
                {title}
            </h3>
            <div className="p-4 space-y-2">
                {children}
            </div>
        </div>
    );
};