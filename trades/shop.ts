// ?shop=Desert+Air puts the shop's name on the page, so an email or a Loom can link to a page that greets them.
// Plain names only: anything with markup or odd characters is dropped, not cleaned, so a bad link reads generically.
const SHOP_MAX = 40;
const SHOP_OK = /^[\p{L}\p{N}][\p{L}\p{N} &'.,-]*$/u;

export const shopFromSearch = (search: string): string | null => {
    const raw = new URLSearchParams(search).get('shop');
    if (!raw) return null;
    const name = raw.replace(/\s+/g, ' ').trim();
    if (!name || name.length > SHOP_MAX || !SHOP_OK.test(name)) return null;
    return name;
};

// UTM tags on the outreach link ride along to the booking page.
export const bookUrl = (base: string, search: string): string => {
    const out = new URLSearchParams();
    new URLSearchParams(search).forEach((value, key) => {
        if (/^utm_[a-z]+$/.test(key) && value.length <= 80) out.set(key, value);
    });
    const qs = out.toString();
    return qs ? `${base}?${qs}` : base;
};
