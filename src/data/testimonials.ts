export type Testimonial = {
	/** Verbatim quote from the client. No paraphrasing. */
	quote: string;
	/** Full name of the person quoted. */
	name: string;
	/** Their role and company, e.g. "VP Engineering, Example Co". */
	role: string;
	/** Optional link to a public case study or the client's own site. */
	href?: string;
	/** ISO 8601 date the testimonial was given, for "as of" dating. */
	date?: string;
};

/**
 * Client testimonials shown on the home page.
 *
 * The section is rendered only when this array is non-empty, so a placeholder
 * quote can never reach production. To publish a testimonial:
 *
 *   1. Ask the client for written permission to publish the quote.
 *   2. Add an entry below using their real name, role and exact words.
 *   3. Replace the `[PLACEHOLDER: ...]` tags in `LAUNCH_TODO.md`.
 *
 * Do not add an entry you have not verified with the client.
 */
export const testimonials: Testimonial[] = [
	// [PLACEHOLDER: no verified client testimonials yet — the section is hidden until this array is populated]
];
