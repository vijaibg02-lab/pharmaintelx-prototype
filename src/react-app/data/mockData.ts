// Mock data for pharmacovigilance dashboard

export interface ADRSignal {
  id: string;
  drug: string;
  adrType: string;
  signalStrength: 'high' | 'moderate' | 'low';
  prr: number;
  ror: number;
  casesReported: number;
  quartersDetected: number;
  recommendation: string;
  lastUpdated: string;
}

export interface RiskAlert {
  id: string;
  drug: string;
  labChange: string;
  knownADR: string;
  probability: number;
  riskLevel: 'high' | 'moderate' | 'low';
  recommendedAction: string;
  explanation: string;
}

export interface DataCompletenessMetric {
  field: string;
  available: boolean;
  prompt?: string;
}

export interface TrendDataPoint {
  quarter: string;
  cases: number;
  prr: number;
}

export interface NetworkSignal {
  id: string;
  drug: string;
  drugCombination?: string;
  signal: string;
  hospitalCount: number;
  totalCases: number;
  signalStrength: number;
  trend: 'increasing' | 'stable' | 'decreasing';
}

// FAERS Signal Detection Data
export const adrSignals: ADRSignal[] = [
  {
    id: '1',
    drug: 'Drug X',
    adrType: 'Liver enzyme elevation',
    signalStrength: 'high',
    prr: 3.2,
    ror: 4.1,
    casesReported: 18,
    quartersDetected: 2,
    recommendation: 'Safety review required',
    lastUpdated: '2024-Q4'
  },
  {
    id: '2',
    drug: 'Amoxicillin',
    adrType: 'Hepatotoxicity',
    signalStrength: 'high',
    prr: 2.8,
    ror: 3.5,
    casesReported: 24,
    quartersDetected: 3,
    recommendation: 'Monitor liver enzymes',
    lastUpdated: '2024-Q4'
  },
  {
    id: '3',
    drug: 'Metformin',
    adrType: 'Lactic acidosis',
    signalStrength: 'moderate',
    prr: 1.9,
    ror: 2.2,
    casesReported: 12,
    quartersDetected: 4,
    recommendation: 'Monitor renal function',
    lastUpdated: '2024-Q4'
  },
  {
    id: '4',
    drug: 'Atorvastatin',
    adrType: 'Rhabdomyolysis',
    signalStrength: 'moderate',
    prr: 2.1,
    ror: 2.6,
    casesReported: 9,
    quartersDetected: 2,
    recommendation: 'Monitor CK levels',
    lastUpdated: '2024-Q3'
  },
  {
    id: '5',
    drug: 'Lisinopril',
    adrType: 'Angioedema',
    signalStrength: 'low',
    prr: 1.4,
    ror: 1.6,
    casesReported: 7,
    quartersDetected: 5,
    recommendation: 'Standard monitoring',
    lastUpdated: '2024-Q4'
  }
];

// Risk Alerts with Explanations
export const riskAlerts: RiskAlert[] = [
  {
    id: '1',
    drug: 'Amoxicillin',
    labChange: 'ALT increased 180%',
    knownADR: 'Hepatotoxicity',
    probability: 0.72,
    riskLevel: 'high',
    recommendedAction: 'Monitor liver enzymes',
    explanation: 'Elevated ALT levels significantly above baseline combined with Amoxicillin exposure indicates potential drug-induced liver injury. Historical FAERS data shows correlation with hepatotoxicity in 24 reported cases.'
  },
  {
    id: '2',
    drug: 'Metformin',
    labChange: 'Creatinine increased 45%',
    knownADR: 'Nephrotoxicity',
    probability: 0.58,
    riskLevel: 'moderate',
    recommendedAction: 'Evaluate renal function',
    explanation: 'Moderate creatinine elevation in patient on Metformin therapy. Risk of lactic acidosis increases with declining renal function.'
  },
  {
    id: '3',
    drug: 'Warfarin + Aspirin',
    labChange: 'INR 4.2',
    knownADR: 'Bleeding risk',
    probability: 0.85,
    riskLevel: 'high',
    recommendedAction: 'Immediate review required',
    explanation: 'Drug-drug interaction detected. Combined anticoagulant therapy with supratherapeutic INR significantly elevates bleeding risk.'
  },
  {
    id: '4',
    drug: 'Simvastatin',
    labChange: 'CK elevated 3x ULN',
    knownADR: 'Myopathy',
    probability: 0.45,
    riskLevel: 'moderate',
    recommendedAction: 'Monitor for muscle symptoms',
    explanation: 'Creatine kinase elevation detected. Statin-induced myopathy possible. Evaluate for muscle pain or weakness.'
  }
];

// Data Completeness for a sample patient
export const dataCompletenessMetrics: DataCompletenessMetric[] = [
  { field: 'Medication History', available: true },
  { field: 'Baseline Laboratory Values', available: false, prompt: 'Please enter baseline creatinine to evaluate nephrotoxicity risk' },
  { field: 'Duration of Therapy', available: false, prompt: 'Please enter duration of drug therapy to assess cumulative toxicity' },
  { field: 'Demographics', available: true },
  { field: 'Clinical Notes', available: false, prompt: 'Medication history incomplete – please add recently started drugs' },
  { field: 'Allergy Information', available: true },
  { field: 'Recent Lab Results', available: true }
];

// Trend data for visualization
export const trendData: TrendDataPoint[] = [
  { quarter: '2023-Q1', cases: 4, prr: 1.2 },
  { quarter: '2023-Q2', cases: 6, prr: 1.5 },
  { quarter: '2023-Q3', cases: 5, prr: 1.4 },
  { quarter: '2023-Q4', cases: 8, prr: 1.8 },
  { quarter: '2024-Q1', cases: 11, prr: 2.1 },
  { quarter: '2024-Q2', cases: 14, prr: 2.5 },
  { quarter: '2024-Q3', cases: 16, prr: 2.9 },
  { quarter: '2024-Q4', cases: 18, prr: 3.2 }
];

// Network signals from multiple hospitals
export const networkSignals: NetworkSignal[] = [
  {
    id: '1',
    drug: 'Drug X',
    drugCombination: 'Drug Y',
    signal: 'QT prolongation',
    hospitalCount: 4,
    totalCases: 23,
    signalStrength: 3.8,
    trend: 'increasing'
  },
  {
    id: '2',
    drug: 'Fluoroquinolone',
    signal: 'Tendon rupture',
    hospitalCount: 6,
    totalCases: 31,
    signalStrength: 2.9,
    trend: 'stable'
  },
  {
    id: '3',
    drug: 'PPI + Clopidogrel',
    signal: 'Reduced antiplatelet effect',
    hospitalCount: 5,
    totalCases: 18,
    signalStrength: 2.4,
    trend: 'increasing'
  }
];

// Drug safety intelligence data
export const drugSafetyProfile = {
  drug: 'Amoxicillin',
  totalReports: 1247,
  topADRs: [
    { adr: 'Rash', count: 312, percentage: 25 },
    { adr: 'Diarrhea', count: 289, percentage: 23 },
    { adr: 'Nausea', count: 198, percentage: 16 },
    { adr: 'Hepatotoxicity', count: 87, percentage: 7 },
    { adr: 'Anaphylaxis', count: 45, percentage: 4 }
  ],
  quarterlyTrends: trendData,
  signalStatus: 'Active monitoring',
  lastReviewDate: '2024-12-15'
};
