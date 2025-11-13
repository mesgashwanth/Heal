// components/charts/MaternityCharts.tsx
import React, { ReactNode } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { KpiData } from '../../types.ts';
import { DashboardKpiCard } from '../SharedComponents.tsx';

// Updated Color constants - separate colors for lines and areas
const COLORS = {
  ACTUAL_LINE: '#2563eb',      // Darker blue for actual line
  ACTUAL_FILL: '#60a5fa',      // Lighter blue for actual fill
  PREDICTION_LINE: '#7c3aed',  // Purple for prediction line
  PREDICTION_FILL: '#a78bfa',  // Lighter purple for prediction fill
  AVERAGE: '#5A9690'           // Green for average line
};

// --- Base Chart Component ---
const ChartWrapper: React.FC<{ kpi: KpiData, children: ReactNode }> = ({ kpi, children }) => (
  <div>
    <DashboardKpiCard data={kpi} />
    <div className="h-80 mt-4">
      <ResponsiveContainer width="100%" height="100%" minHeight={250}>
        {children}
      </ResponsiveContainer>
    </div>
  </div>
);

// --- Maternal Weight Chart ---
export const MaternalWeightChart: React.FC<{ data: any[], averageData: any[], kpiData: KpiData }> = ({ data, averageData, kpiData }) => (
  <ChartWrapper kpi={kpiData}>
    <AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
      <XAxis
        dataKey="GESTATIONAL_AGE_WEEKS"
        stroke="#6b7280"
        fontSize={12}
        tickFormatter={(val) => `${val}w`}
      />
      <YAxis
        stroke="#6b7280"
        fontSize={12}
        tickFormatter={(val) => `${val}kg`}
      />
      <Tooltip
        formatter={(value: number) => [`${value} kg`, 'Weight']}
        labelFormatter={(label) => `Week ${label}`}
      />
      <Legend />

      {/* 1. Real Data (Area) */}
      <Area
        type="monotone"
        dataKey="MATERNAL_WEIGHT"
        stroke={COLORS.ACTUAL_LINE}
        fill={COLORS.ACTUAL_FILL}
        fillOpacity={0.6}
        strokeWidth={2}
        name="Weight (kg)"
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
        connectNulls={false}
      />

      {/* 2. Predicted Data (Area) */}
      <Area
        type="monotone"
        dataKey="PREDICTED_WEIGHT"
        stroke={COLORS.PREDICTION_LINE}
        fill={COLORS.PREDICTION_FILL}
        fillOpacity={0.4}
        strokeWidth={2}
        name="Predicted Weight"
        dot={false}
        activeDot={false}
        strokeDasharray="5 5"
      />

      {/* 3. Average Line */}
      <Area
        type="monotone"
        dataKey="AVG_WEIGHT"
        data={averageData}
        stroke={COLORS.AVERAGE}
        fill="transparent"
        strokeWidth={3}
        name="Average (BMI)"
        dot={false}
        activeDot={false}
      />
    </AreaChart>
  </ChartWrapper>
);

// --- Fetal Growth Chart ---
export const FetalGrowthChart: React.FC<{ data: any[], averageData: any[], kpiData: KpiData }> = ({ data, averageData, kpiData }) => (
  <ChartWrapper kpi={kpiData}>
    <AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
      <XAxis
        dataKey="GESTATIONAL_AGE_WEEKS"
        stroke="#6b7280"
        fontSize={12}
        tickFormatter={(val) => `${val}w`}
      />
      <YAxis
        stroke="#6b7280"
        fontSize={12}
        tickFormatter={(val) => `${val}cm`}
      />
      <Tooltip
        formatter={(value: number) => [`${value} cm`, 'Fundal Height']}
        labelFormatter={(label) => `Week ${label}`}
      />
      <Legend />

      {/* 1. Real Data (Area) */}
      <Area
        type="monotone"
        dataKey="FUNDAL_HEIGHT"
        stroke={COLORS.ACTUAL_LINE}
        fill={COLORS.ACTUAL_FILL}
        fillOpacity={0.6}
        strokeWidth={2}
        name="Fundal Height (cm)"
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
        connectNulls={false}
      />

      {/* 2. Predicted Data (Area) */}
      <Area
        type="monotone"
        dataKey="PREDICTED_FUNDAL_HEIGHT"
        stroke={COLORS.PREDICTION_LINE}
        fill={COLORS.PREDICTION_FILL}
        fillOpacity={0.4}
        strokeWidth={2}
        name="Predicted Height"
        dot={false}
        activeDot={false}
        strokeDasharray="5 5"
      />

      {/* 3. Average Line */}
      <Area
        type="monotone"
        dataKey="AVG_FUNDAL"
        data={averageData}
        stroke={COLORS.AVERAGE}
        fill="transparent"
        strokeWidth={3}
        name="Average (BMI)"
        dot={false}
        activeDot={false}
      />
    </AreaChart>
  </ChartWrapper>
);

// --- Hemoglobin Chart ---
export const HemoglobinChart: React.FC<{ data: any[], averageData: any[], kpiData: KpiData }> = ({ data, averageData, kpiData }) => (
  <ChartWrapper kpi={kpiData}>
    <AreaChart data={data} margin={{ top: 50, right: 20, left: 10, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
      <XAxis
        dataKey="GESTATIONAL_AGE_WEEKS"
        stroke="#6b7280"
        fontSize={12}
        tickFormatter={(val) => `${val}w`}
      />
      <YAxis
        stroke="#6b7280"
        fontSize={12}
        tickFormatter={(val) => `${val} g/dL`}
      />
      <Tooltip
        formatter={(value: number) => [`${value} g/dL`, 'Hemoglobin']}
        labelFormatter={(label) => `Week ${label}`}
      />
      <Legend />

      {/* 1. Real Data (Area) */}
      <Area
        type="monotone"
        dataKey="HEMOGLOBIN_LEVEL"
        stroke={COLORS.ACTUAL_LINE}
        fill={COLORS.ACTUAL_FILL}
        fillOpacity={0.6}
        strokeWidth={2}
        name="Hb Level (g/dL)"
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
        connectNulls={false}
      />

      {/* 2. Predicted Data (Area) */}
      <Area
        type="monotone"
        dataKey="PREDICTED_HEMOGLOBIN_LEVEL"
        stroke={COLORS.PREDICTION_LINE}
        fill={COLORS.PREDICTION_FILL}
        fillOpacity={0.4}
        strokeWidth={2}
        name="Predicted Hb"
        dot={false}
        activeDot={false}
        strokeDasharray="5 5"
      />

      {/* 3. Average Line */}
      <Area
        type="monotone"
        dataKey="AVG_HB"
        data={averageData}
        stroke={COLORS.AVERAGE}
        fill="transparent"
        strokeWidth={3}
        name="Average (BMI)"
        dot={false}
        activeDot={false}
      />
    </AreaChart>
  </ChartWrapper>
);

// --- Blood Pressure Chart ---
export const BloodPressureChart: React.FC<{ data: any[], averageData: any[], kpiData: KpiData }> = ({ data, averageData, kpiData }) => (
  <ChartWrapper kpi={kpiData}>
    <AreaChart data={data} margin={{ top: 10, right: 20, left: 30, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
      <XAxis
        dataKey="GESTATIONAL_AGE_WEEKS"
        stroke="#6b7280"
        fontSize={12}
        tickFormatter={(val) => `${val}w`}
      />
      <YAxis
        stroke="#6b7280"
        fontSize={12}
        tickFormatter={(val) => `${val} mmHg`}
      />
      <Tooltip labelFormatter={(label) => `Week ${label}`} />
      <Legend />

      {/* --- REAL DATA (AREAS) --- */}
      <Area
        type="monotone"
        dataKey="BP_SYSTOLIC"
        stroke={COLORS.ACTUAL_LINE}
        fill={COLORS.ACTUAL_FILL}
        fillOpacity={0.6}
        strokeWidth={2}
        name="Systolic (mmHg)"
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
        connectNulls={false}
      />
      <Area
        type="monotone"
        dataKey="BP_DIASTOLIC"
        stroke={COLORS.PREDICTION_LINE}
        fill={COLORS.PREDICTION_FILL}
        fillOpacity={0.4}
        strokeWidth={2}
        name="Diastolic (mmHg)"
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
        connectNulls={false}
      />

      {/* --- PREDICTED DATA (AREAS) --- */}
      <Area
        type="monotone"
        dataKey="PREDICTED_BP_SYSTOLIC"
        stroke={COLORS.ACTUAL_LINE}
        fill={COLORS.ACTUAL_FILL}
        fillOpacity={0.3}
        strokeWidth={2}
        name="Predicted Systolic"
        dot={false}
        activeDot={false}
        strokeDasharray="5 5"
      />
      <Area
        type="monotone"
        dataKey="PREDICTED_BP_DIASTOLIC"
        stroke={COLORS.PREDICTION_LINE}
        fill={COLORS.PREDICTION_FILL}
        fillOpacity={0.2}
        strokeWidth={2}
        name="Predicted Diastolic"
        dot={false}
        activeDot={false}
        strokeDasharray="5 5"
      />

      {/* --- AVERAGE LINES --- */}
      <Area
        type="monotone"
        dataKey="AVG_SYSTOLIC"
        data={averageData}
        stroke={COLORS.AVERAGE}
        fill="transparent"
        strokeWidth={3}
        name="Average Systolic (BMI)"
        dot={false}
        activeDot={false}
      />
      <Area
        type="monotone"
        dataKey="AVG_DIASTOLIC"
        data={averageData}
        stroke={COLORS.AVERAGE}
        fill="transparent"
        strokeWidth={3}
        name="Average Diastolic (BMI)"
        dot={false}
        activeDot={false}
      />
    </AreaChart>
  </ChartWrapper>
);