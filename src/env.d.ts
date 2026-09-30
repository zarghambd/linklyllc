/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	/** Plausible analytics domain, e.g. "linklyllc.com". Empty disables analytics. */
	readonly PUBLIC_PLAUSIBLE_DOMAIN?: string;
	/** Resend API key used by POST /api/contact. Server-only. */
	readonly RESEND_API_KEY?: string;
	/** From address on outgoing contact-form mail. Server-only. */
	readonly CONTACT_FROM_EMAIL?: string;
	/** Inbox that receives contact-form submissions. Server-only. */
	readonly CONTACT_TO_EMAIL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
