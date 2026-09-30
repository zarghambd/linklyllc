export type Stat = {
	value: string;
	label: string;
	/**
	 * Optional note rendered under the label explaining how the figure is
	 * substantiated. Set this for any number a prospect could reasonably
	 * challenge.
	 */
	note?: string;
};

/**
 * Headline figures shown in the trust band on the home page.
 *
 * Every value here is a factual claim and must be true on the day it ships.
 * Prefer figures you can point at (a count from your project tracker, a
 * published score, a dated engagement) over round numbers.
 */
export const stats: Stat[] = [
	{
		value: '20+',
		label: 'Projects delivered',
		// [PLACEHOLDER: confirm 20+ is still accurate and be able to evidence it on request]
	},
	{
		value: '5+',
		label: 'Years of experience',
		// [PLACEHOLDER: confirm 5+ is still accurate and be able to evidence it on request]
	},
];
