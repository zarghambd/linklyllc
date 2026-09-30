/**
 * Privacy-friendly, cookie-free analytics.
 *
 * Plausible stores no cookies, builds no cross-site profile and does not
 * fingerprint visitors, which is why it needs no consent banner in the US
 * states with sensitive-data rules. Set PUBLIC_PLAUSIBLE_DOMAIN in `.env` to
 * enable it; with no domain configured nothing is loaded and no request is
 * made to plausible.io.
 */
export const plausibleDomain = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN ?? '';
export const plausibleEnabled = plausibleDomain.length > 0;

/**
 * localStorage key holding the visitor's explicit analytics choice.
 *
 * Analytics is opt-out rather than opt-in here, so the absence of a stored
 * value means "allowed". A visitor who opts out on /cookie-preferences gets
 * `'denied'`, which BaseHead reads before loading the Plausible script. Using
 * a separate key from `theme` keeps the two decisions independent.
 */
export const analyticsConsentKey = 'analytics-consent';
