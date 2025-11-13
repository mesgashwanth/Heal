// src/types.ts
import React, { ReactNode } from 'react';

export type Tab = 'Dashboard' | 'Chatbot' | 'Image Generator';
export type Page = 'HOME' | 'PATIENT_DETAILS' | 'ONGOING_PATIENTS';
export type ChartTab = 'weight' | 'growth' | 'hb' | 'bp';

// ⭐️ MODIFIED: Added properties to HomeKpiData
export interface HomeKpiData {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export interface HomeSummaryData {
  totalPatients: number;
  activePregnancies: number;
  todaysAppointments: number;
  onDutyDoctors: number;
  bedOccupancy: number;
  normalDeliveryCount: number;
  cSectionDeliveryCount: number;
}
export type KpiStatus = 'stable' | 'positive' | 'negative' | 'critical';

export interface KpiData {
  title: string;
  value: string;
  unit: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'stable';
  icon: ReactNode;
}

export interface Patient {
  PATIENT_ID: string;
  PATIENT_NAME: string;
  AGE?: number;
  DATE_OF_BIRTH?: string;
  BLOOD_TYPE?: string;
  MEDICAL_HISTORY?: string;
  BMI_STATUS?: string;
  BMI_VALUE?: number;
  GRAVIDA?: number;
  PARITY?: number;
  FIRST_NAME?: string;
  LAST_NAME?: string;
  DIET_TYPE?: string;
  ACTIVITY_LEVEL?: string;
}

// --- Data structure for the Patient Dashboard ---
export interface DashboardData {
  kpiData: {
    MATERNAL_WEIGHT?: number;
    FUNDAL_HEIGHT?: number;
    HEMOGLOBIN_LEVEL?: number;
    BLOOD_PRESSURE?: string;
    GESTATIONAL_AGE_WEEKS?: number;
    ESTIMATED_DUE_DATE?: string;
  };
  deliveryData: {
    DELIVERY_DATE?: string;
    DELIVERY_MODE?: string;
    MOTHER_CONDITION_POST_DELIVERY?: string;
    GESTATIONAL_AGE_AT_DELIVERY?: number;
  };
  visitCounts: {
    VISIT_COUNT: number;
    VACCINATED_COUNT: number;
  };
  charts: {
    maternalWeight: any[];
    fundalHeight: any[];
    hemoglobin: any[];
    bloodPressure: any[];
    averageWeight: any[];
    averageFundal: any[];
    averageHemoglobin: any[];
    averageBloodPressure: any[];
  };
  babyData: {
    BIRTH_WEIGHT?: number;
    DISCHARGE_DATE?: string;
    SOURCE_SCHEMA?: string;
  };
  patientProfile: {
    DATE_OF_BIRTH?: string;
    BLOOD_TYPE?: string;
    MEDICAL_HISTORY?: string;
    BMI_STATUS?: string;
  };
  riskScores?: { [key: string]: number };
  deliveryType?: { [key: string]: number };
  deliveryMode?: { [key: string]: number };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}