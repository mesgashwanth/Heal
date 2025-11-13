// src/components/KpiCard.tsx
import React from 'react';
import type { KpiData } from '../types';

type KpiStatus = 'stable' | 'positive' | 'negative' | 'critical';

interface KpiCardProps {
  data: KpiData;
  isHighlighted?: boolean;
  status?: KpiStatus;
}

const KpiCard: React.FC<KpiCardProps> = ({ data, isHighlighted = false, status = 'stable' }) => {
  const { title, value, unit, change, changeType, icon } = data;

  const changeColors = {
    increase: 'text-green-500',
    decrease: 'text-red-500',
    stable: 'text-gray-500',
  };

  const statusClasses = {
    stable: 'border-border',
    positive: 'border-green-500',
    negative: 'border-red-500',
    critical: 'border-red-500 bg-red-50', // Still applies bg-red-50 for critical status
  };

  // --- UPDATED ---
  // If highlighted, use white background with primary-dark border.
  // Otherwise, use bg-card and apply status-based classes.
  const backgroundAndBorderClasses = isHighlighted
    ? 'bg-white border-primary-dark' // Changed bg-primary-light to bg-white
    : `bg-card ${statusClasses[status]}`;

  return (
    <div className={`shadow-sm rounded-lg p-4 border ${backgroundAndBorderClasses}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
        <span className="text-text-secondary">{icon}</span>
      </div>
      <div className="flex items-baseline space-x-1">
        <span className="text-2xl font-bold text-text-primary">{value}</span>
        <span className="text-sm font-medium text-text-secondary">{unit}</span>
      </div>
      {change && (
        <div className={`text-xs font-medium ${changeColors[changeType]}`}>
          {change} in last week
        </div>
      )}
    </div>
  );
};

export default KpiCard;