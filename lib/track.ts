type Params = Record<string, string | number | boolean>;

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        fbq?: (...args: unknown[]) => void;
    }
}

// GA4 custom event. booking-confirmed.html fires the conversion itself.
export const track = (event: string, params: Params = {}) => {
    window.gtag?.('event', event, params);
};

// Book-call CTA: GA4 event plus Meta standard "Lead" so ads can optimise on intent.
export const trackBookClick = (location: string) => {
    track('cta_book_click', { location, page: window.location.pathname });
    window.fbq?.('track', 'Lead', { content_name: location });
};
