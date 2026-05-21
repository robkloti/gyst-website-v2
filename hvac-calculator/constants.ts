import { CalculatorInputs, QuestionConfig } from './types';

export const QUESTIONS: QuestionConfig[] = [
  {
    id: 'monthlyLeads',
    label: 'Roughly how many leads come into your business per month?',
    helper:
      "Leads = anyone who called or filled out a form, even if they didn't book.",
    min: 50,
    max: 1000,
    step: 10,
    default: 200,
    format: 'integer',
  },
  {
    id: 'conversionRate',
    label: 'What percentage of those leads turn into a booked job?',
    helper:
      "If you don't know exactly, your gut number is fine. Industry average for residential HVAC is around 20%.",
    min: 5,
    max: 50,
    step: 1,
    default: 20,
    format: 'percent',
  },
  {
    id: 'averageTicket',
    label: "What's the average dollar value of a booked job?",
    helper:
      'Include service calls, repairs, replacements — your typical mix.',
    min: 200,
    max: 15000,
    step: 100,
    default: 1800,
    format: 'currency',
  },
  {
    id: 'oldQuotes',
    label:
      'Roughly how many old, unconverted quotes are sitting in your CRM right now?',
    helper:
      "Quotes from the last 12 months that didn't go forward. If you're not sure, 400 is a defensible guess for a 5-10 tech operation.",
    min: 50,
    max: 2000,
    step: 10,
    default: 400,
    format: 'integer',
  },
];

export const DEFAULT_INPUTS: CalculatorInputs = {
  monthlyLeads: 200,
  conversionRate: 0.2,
  averageTicket: 1800,
  oldQuotes: 400,
};

export const ACCENT_HEX = '#D45D00'; // deep tradesman orange (per PRP Task 10)
