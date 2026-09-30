export type Service = {
	title: string;
	description: string;
	/** Which capability pill on /services this card belongs to. */
	group: 'web' | 'ai' | 'mobile';
	/** Inline 24x24 stroke icon markup. Decorative, so it is aria-hidden. */
	icon: string;
	slug: string;
};

export const services: Service[] = [
	{
		title: 'Enterprise Web Applications',
		slug: '/services#enterprise-web-applications',
		group: 'web',
		description:
			'Custom web platforms tailored to your business operations. We build scalable SaaS solutions, internal management dashboards, customer portals, and workflow automation systems built for high throughput and long-term reliability.',
		icon: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Zm3.5 2h9M7.5 12h5m-5 3h9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
	},
	{
		title: 'Dynamic Frontend Interfaces',
		slug: '/services#dynamic-frontend-interfaces',
		group: 'web',
		description:
			'Fast, accessible, and interactive user interfaces designed with modern UX/UI principles. We convert visual designs into pixel-perfect web apps that load instantly across all desktop, tablet, and mobile browsers.',
		icon: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Zm3 4h10M8 15.5h5M10 7.5V5m4 2.5V5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
	},
	{
		title: 'Scalable Backend Architecture & APIs',
		slug: '/services#scalable-backend-architecture',
		group: 'web',
		description:
			'Robust server-side architecture designed to manage complex business logic and handle high volumes of traffic without latency. We design, build, and document secure RESTful and GraphQL APIs for third-party integrations and internal ecosystem communication.',
		icon: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 8.5V7a5 5 0 0 1 10 0v1.5M6 12h12M8 12v5.5h8V12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
	},
	{
		title: 'Headless CMS & E-Commerce Platforms',
		slug: '/services#headless-cms',
		group: 'web',
		description:
			'Modern web storefronts and content management systems decoupled for maximum performance, security, and flexibility. Manage your digital assets seamlessly while delivering lightning-fast pages to your customers.',
		icon: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9.5 12 4l8 5.5v5L12 20l-8-5.5v-5Zm8 5.5V8.5M4 9.5l8 5.5 8-5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
	},
	{
		title: 'AI Automation & Agents',
		slug: '/ai-agents',
		group: 'ai',
		description:
			'Workflow automation and AI agents that take on the repetitive operational work. We connect language models to your existing systems so routine requests, document handling, and internal approvals run without a person in the loop.',
		icon: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3.5a4 4 0 0 1 4 4v1.2a2.8 2.8 0 0 1 0 5.6v1.2a4 4 0 0 1-8 0v-1.2a2.8 2.8 0 0 1 0-5.6V7.5a4 4 0 0 1 4-4Zm-4 9.5H6.5A2.5 2.5 0 0 0 4 15.5v1A2.5 2.5 0 0 0 6.5 19h1.5m8-6h1.5A2.5 2.5 0 0 1 20 15.5v1a2.5 2.5 0 0 1-2.5 2.5H16M12 3.5v-1m0 19v-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
	},
	{
		title: 'Mobile App Development',
		slug: '/mobile-apps',
		group: 'mobile',
		description:
			'Cross-platform iOS and Android applications built from a single codebase. You get a single product experience on both platforms, a much smaller maintenance surface, and a faster path from idea to a working release.',
		icon: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8.5 3.5h7A2.5 2.5 0 0 1 18 6v12a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 6 18V6a2.5 2.5 0 0 1 2.5-2.5ZM10 5.5h4M10.5 17.8h3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
	},
];

export const serviceGroups = {
	web: 'Web development',
	ai: 'AI automation',
	mobile: 'Mobile',
} as const;

export const techStack = [
	'Astro',
	'React',
	'TypeScript',
	'Node.js',
	'Next.js',
	'PostgreSQL',
	'AWS',
	'GraphQL',
];

export type Reason = {
	title: string;
	description: string;
	icon: string;
};

export const reasons: Reason[] = [
	{
		title: 'Performance-first delivery',
		description:
			'We build for speed, clarity, and measurable business impact from day one, and we report the numbers rather than asserting them.',
		icon: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13 2 5 13h5l-1 9 8-11h-5l1-9Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
	},
	{
		title: 'Clean engineering',
		description:
			'Structured frontends and backend systems that are maintainable, scalable, and easy to evolve as your requirements change.',
		icon: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 7.5 4 12l4 4.5M16 7.5 20 12l-4 4.5M13.5 4.5l-3 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
	},
	{
		title: 'Security and trust',
		description:
			'We harden applications for reliability and data protection, and we document what we did so it can be reviewed.',
		icon: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3.5 18 6v5.5c0 4.2-2.7 7.8-6 9-3.3-1.2-6-4.8-6-9V6l6-2.5Zm0 6.3v4.2m0-9.1V9.7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
	},
];
