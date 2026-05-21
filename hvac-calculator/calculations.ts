import { CalculatorInputs, CalculationResult } from './types';

/**
 * HVAC lead-loss math. These formulas are calibrated per HVAC_FUNNEL_COPY_V2_0.md
 * and the PRP — do not improvise. Changing them changes the funnel's conversion
 * thesis.
 *
 * Defaults: monthlyLeads=200, conversionRate=0.20, averageTicket=1800, oldQuotes=400
 * Expected output: afterHoursLeak=$57,600, deadQuoteLeak=$86,400, adTrackingLeak=$560,
 *                  totalMonthlyLeak=$144,560
 */
export function calculate(inputs: CalculatorInputs): CalculationResult {
  const { monthlyLeads, conversionRate, averageTicket, oldQuotes } = inputs;

  // After-hours leak: 40% of leads happen after hours; non-converted portion is
  // lost to voicemail; recovery factor 0.5 = half are theoretically recoverable.
  const afterHoursLeak =
    monthlyLeads * 0.4 * (1 - conversionRate) * averageTicket * 0.5;

  // Dead quote leak: 12% of stale CRM quotes are reactivatable at full ticket.
  const deadQuoteLeak = oldQuotes * 0.12 * averageTicket;

  // Ad tracking leak: monthly ad spend estimated as leads * $8 CPL; 35% wasted
  // on untracked/poor-performing campaigns.
  const adTrackingLeak = monthlyLeads * 8 * 0.35;

  const totalMonthlyLeak = afterHoursLeak + deadQuoteLeak + adTrackingLeak;

  return {
    afterHoursLeak: Math.round(afterHoursLeak),
    deadQuoteLeak: Math.round(deadQuoteLeak),
    adTrackingLeak: Math.round(adTrackingLeak),
    totalMonthlyLeak: Math.round(totalMonthlyLeak),
  };
}

export function formatCurrency(value: number): string {
  return `$${Math.round(value).toLocaleString('en-US')}`;
}
