export interface CalculatorInputs {
  monthlyLeads: number;
  conversionRate: number; // decimal, e.g. 0.20 for 20%
  averageTicket: number; // USD
  oldQuotes: number;
}

export interface CalculationResult {
  afterHoursLeak: number;
  deadQuoteLeak: number;
  adTrackingLeak: number;
  totalMonthlyLeak: number;
}

export type QuestionFormat = 'integer' | 'percent' | 'currency';

export interface QuestionConfig {
  id: keyof CalculatorInputs;
  label: string;
  helper: string;
  min: number;
  max: number;
  step: number;
  default: number;
  format: QuestionFormat;
}
