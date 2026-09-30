/**
 * Options for the project inquiry form. The API endpoint validates submitted
 * values against these exact lists, so adding an option here is enough to
 * make it acceptable on both sides.
 */
export const projectTypes = [
	'Custom web application',
	'Website or marketing site',
	'Headless CMS or e-commerce',
	'AI automation or AI agent',
	'Mobile app (iOS / Android)',
	'Maintenance or ongoing support',
	'Something else',
] as const;

export const budgetRanges = [
	'Under $5,000',
	'$5,000 – $15,000',
	'$15,000 – $50,000',
	'$50,000 – $100,000',
	'Over $100,000',
	'Not sure yet',
] as const;
