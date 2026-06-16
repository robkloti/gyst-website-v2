import { CalculatorInputs, CalculationResult } from './types';

/**
 * Air-con lead-loss math (Australia). The formula thesis is identical to the US
 * funnel — only the CPL constant and the currency locale are localised. Do not
 * improvise; changing the formulas changes the funnel's conversion thesis.
 *
 * Defaults: monthlyLeads=200, conversionRate=0.20, averageTicket=2200, oldQuotes=400
 * Expected output: afterHoursLeak=A$70,400, deadQuoteLeak=A$105,600, adTrackingLeak=A$1,050,
 *                  totalMonthlyLeak=A$177,050
 */
export function calculate(inputs: CalculatorInputs): CalculationResult {
  const { monthlyLeads, conversionRate, averageTicket, oldQuotes } = inputs;

  // After-hours leak: 40% of leads happen after hours; non-converted portion is
  // lost to voicemail; recovery factor 0.5 = half are theoretically recoverable.
  const afterHoursLeak =
    monthlyLeads * 0.4 * (1 - conversionRate) * averageTicket * 0.5;

  // Dead quote leak: 12% of stale CRM quotes are reactivatable at full ticket.
  const deadQuoteLeak = oldQuotes * 0.12 * averageTicket;

  // Ad tracking leak: monthly ad spend estimated as leads * A$15 blended CPL
  // (deliberately conservative — AU paid air-con CPLs run A$40-150, but most
  // inbound isn't paid); 35% wasted on untracked/poor-performing campaigns.
  const adTrackingLeak = monthlyLeads * 15 * 0.35;

  const totalMonthlyLeak = afterHoursLeak + deadQuoteLeak + adTrackingLeak;

  return {
    afterHoursLeak: Math.round(afterHoursLeak),
    deadQuoteLeak: Math.round(deadQuoteLeak),
    adTrackingLeak: Math.round(adTrackingLeak),
    totalMonthlyLeak: Math.round(totalMonthlyLeak),
  };
}

export function formatCurrency(value: number): string {
  return `$${Math.round(value).toLocaleString('en-AU')}`;
}
