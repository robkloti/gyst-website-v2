import React, { useState } from 'react';
import { Mail, Download } from 'lucide-react';
import { CalculationResult } from './types';
import { ACCENT_HEX } from './constants';

interface EmailCaptureProps {
  result: CalculationResult;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GoHighLevel inbound-webhook URL (GHL Workflow → "Inbound Webhook" trigger).
// Set as VITE_GHL_WEBHOOK_URL in Vercel env (Production + Preview). GHL requires
// an application/json body and returns permissive CORS headers (verified), so a
// normal cross-origin POST works and we can read the response.
const GHL_WEBHOOK_URL = (import.meta as any).env?.VITE_GHL_WEBHOOK_URL as
  | string
  | undefined;

export const EmailCapture: React.FC<EmailCaptureProps> = ({ result }) => {
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email.');
      return;
    }
    setSubmitting(true);
    try {
      if (!GHL_WEBHOOK_URL) {
        console.error(
          '[hvac-calculator] VITE_GHL_WEBHOOK_URL is not set — lead not captured.'
        );
        throw new Error('not_configured');
      }
      // Flat payload so GHL can map each field to a contact field directly.
      const res = await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          email,
          source: 'hvac_calculator',
          page_url: typeof window !== 'undefined' ? window.location.href : '',
          monthly_leak_total: result.totalMonthlyLeak,
          after_hours_leak: result.afterHoursLeak,
          dead_quote_leak: result.deadQuoteLeak,
          ad_tracking_leak: result.adTrackingLeak,
        }),
      });
      if (!res.ok) throw new Error(`webhook_${res.status}`);
      if (
        typeof window !== 'undefined' &&
        typeof (window as any).gtag === 'function'
      ) {
        (window as any).gtag('event', 'calculator_email_captured', {
          event_category: 'engagement',
          event_label: 'hvac_calculator',
          value: result.totalMonthlyLeak,
        });
      }
      setDone(true);
    } catch (err) {
      console.error('[hvac-calculator] email capture failed', err);
      setError('Couldn’t send that just now. Mind trying again?');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePdf = () => {
    // TODO: implement client-side PDF generation. Browser print-to-PDF works
    // as a V1 fallback so visitors can still save the report.
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-5 pb-12 md:pb-16">
      {!expanded && !done && (
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm transition-all hover:opacity-90"
            style={{ backgroundColor: ACCENT_HEX, color: '#1A1B1D' }}
          >
            <Mail size={16} /> Email me this report
          </button>
          <button
            type="button"
            onClick={handlePdf}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-all"
          >
            <Download size={16} /> Download as PDF
          </button>
        </div>
      )}

      {expanded && !done && (
        <form
          onSubmit={handleEmailSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@yourcompany.com"
            className="flex-1 px-5 py-3.5 rounded-full bg-[#202124] border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/40"
            autoFocus
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3.5 rounded-full font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: ACCENT_HEX, color: '#1A1B1D' }}
          >
            {submitting ? 'Sending…' : 'Send report'}
          </button>
        </form>
      )}

      {error && (
        <p className="text-red-400 text-xs mt-2 text-center">{error}</p>
      )}
      {done && (
        <p className="text-emerald-400 text-sm mt-2 text-center">
          Sent. Check your inbox.
        </p>
      )}
    </section>
  );
};
