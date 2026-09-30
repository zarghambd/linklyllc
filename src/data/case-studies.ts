export type CaseStudy = {
	/** Short label for the client or project. */
	client: string;
	/** Industry or sector, e.g. "Logistics". */
	sector: string;
	/** What Linkly LLC built and why. */
	summary: string;
	/** Bullet list of the scope delivered. */
	scope: string[];
	/** Technology used. */
	stack: string[];
	/**
	 * Outcome metrics. Only fill these in with numbers you can evidence and
	 * that the client has agreed to publish.
	 */
	results?: { value: string; label: string }[];
	/**
	 * Set to false while the study is unverified. A card with `published: false`
	 * still renders on /work but carries a visible "unverified" badge so it can
	 * never be mistaken for a real engagement.
	 */
	published: boolean;
	href?: string;
};

export const caseStudies: CaseStudy[] = [
	{
		// [PLACEHOLDER: real client name or anonymised project name]
		client: '[PLACEHOLDER: client or project name]',
		// [PLACEHOLDER: sector]
		sector: '[PLACEHOLDER: sector]',
		// [PLACEHOLDER: two or three sentences on the problem and the solution]
		summary:
			'[PLACEHOLDER: describe the client’s problem, what we built to solve it, and how the engagement ran. Two or three sentences is enough.]',
		// [PLACEHOLDER: replace with the actual scope delivered]
		scope: [
			'[PLACEHOLDER: scope item]',
			'[PLACEHOLDER: scope item]',
			'[PLACEHOLDER: scope item]',
		],
		// [PLACEHOLDER: replace with the real stack]
		stack: ['[PLACEHOLDER: technology]'],
		// [PLACEHOLDER: add outcomes only once they are measured and the client has approved publication]
		results: undefined,
		published: false,
	},
	{
		// [PLACEHOLDER: real client name or anonymised project name]
		client: '[PLACEHOLDER: client or project name]',
		// [PLACEHOLDER: sector]
		sector: '[PLACEHOLDER: sector]',
		// [PLACEHOLDER: two or three sentences on the problem and the solution]
		summary:
			'[PLACEHOLDER: describe the client’s problem, what we built to solve it, and how the engagement ran. Two or three sentences is enough.]',
		// [PLACEHOLDER: replace with the actual scope delivered]
		scope: [
			'[PLACEHOLDER: scope item]',
			'[PLACEHOLDER: scope item]',
			'[PLACEHOLDER: scope item]',
		],
		// [PLACEHOLDER: replace with the real stack]
		stack: ['[PLACEHOLDER: technology]'],
		// [PLACEHOLDER: add outcomes only once they are measured and the client has approved publication]
		results: undefined,
		published: false,
	},
	{
		// [PLACEHOLDER: real client name or anonymised project name]
		client: '[PLACEHOLDER: client or project name]',
		// [PLACEHOLDER: sector]
		sector: '[PLACEHOLDER: sector]',
		// [PLACEHOLDER: two or three sentences on the problem and the solution]
		summary:
			'[PLACEHOLDER: describe the client’s problem, what we built to solve it, and how the engagement ran. Two or three sentences is enough.]',
		// [PLACEHOLDER: replace with the actual scope delivered]
		scope: [
			'[PLACEHOLDER: scope item]',
			'[PLACEHOLDER: scope item]',
			'[PLACEHOLDER: scope item]',
		],
		// [PLACEHOLDER: replace with the real stack]
		stack: ['[PLACEHOLDER: technology]'],
		// [PLACEHOLDER: add outcomes only once they are measured and the client has approved publication]
		results: undefined,
		published: false,
	},
];
