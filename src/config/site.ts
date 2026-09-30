/**
 * Single source of truth for company details used across the site.
 *
 * Anything the business has not supplied yet is left as an empty string or an
 * explicit `[PLACEHOLDER: ...]` token. Components are written to hide a line
 * entirely when its value is empty, so a missing value can never ship as a
 * fabricated detail. See LAUNCH_TODO.md for the full list of open items.
 */

export type Social = {
	/** Accessible name, e.g. "Linkly LLC on GitHub". */
	label: string;
	/** Absolute profile URL. An empty url hides the icon sitewide. */
	url: string;
	/** Iconify collection:name pair, resolved locally by astro-icon. */
	icon: string;
};

export const site = {
	name: 'Linkly LLC',

	/** [PLACEHOLDER: confirm the production domain this will launch on] */
	url: 'https://www.linklyllc.com',

	tagline: 'Custom web development and product engineering for ambitious businesses.',

	email: 'hello@linklyllc.com',

	/**
	 * [PLACEHOLDER: real US phone number in E.164 format, e.g. "+15555550123"]
	 * Left empty on purpose: the phone line is hidden sitewide until a real
	 * number is supplied, rather than showing a placeholder to visitors.
	 */
	phone: '',

	/** Registered business address. Required for CAN-SPAM notices and the legal pages. */
	address: {
		// [PLACEHOLDER: registered business street address]
		street: '[PLACEHOLDER: street address]',
		// [PLACEHOLDER: city]
		city: '[PLACEHOLDER: city]',
		// [PLACEHOLDER: state / province]
		region: '[PLACEHOLDER: state]',
		// [PLACEHOLDER: ZIP code]
		postalCode: '[PLACEHOLDER: ZIP code]',
		country: 'United States',
	},

	socials: [
		// [PLACEHOLDER: real profile URLs — each entry without a url is hidden]
		{ label: 'Linkly LLC on X', url: '', icon: 'mdi:twitter' },
		{ label: 'Linkly LLC on YouTube', url: '', icon: 'mdi:youtube' },
		{ label: 'Linkly LLC on GitHub', url: '', icon: 'mdi:github' },
		{ label: 'Linkly LLC on LinkedIn', url: '', icon: 'mdi:linkedin' },
		{ label: 'Linkly LLC on Discord', url: '', icon: 'ic:baseline-discord' },
	] satisfies Social[],

	/**
	 * Legal-entity details consumed by /privacy-policy, /terms-of-service and
	 * /refund-policy. These are deliberately unresolved tokens — they must be
	 * replaced with attorney-reviewed values before launch.
	 */
	legal: {
		entityName: '[PLACEHOLDER: LEGAL ENTITY NAME]',
		stateOfFormation: '[PLACEHOLDER: STATE OF FORMATION]',
		effectiveDate: '[PLACEHOLDER: EFFECTIVE DATE]',
		contactEmail: '[PLACEHOLDER: CONTACT EMAIL for privacy and legal requests]',
	},
} as const;

/** Social profiles that actually have a URL. Drives the footer icon row. */
export const socialsWithUrls = site.socials.filter((social) => social.url.length > 0);

/** True when a real phone number has been configured. */
export const hasPhone = site.phone.length > 0;

/** Human-readable postal address, one line per part. */
export const addressLines = [
	site.address.street,
	site.address.city,
	[site.address.region, site.address.postalCode].filter(Boolean).join(' '),
	site.address.country,
].filter((line) => line.length > 0);
