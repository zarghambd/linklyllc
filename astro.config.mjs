import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import lit from '@astrojs/lit';
import vercel from '@astrojs/vercel/serverless';
import { site } from './src/config/site';

export default defineConfig({
	// Canonical origin for canonical tags, the sitemap and robots.txt.
	// [PLACEHOLDER: confirm this matches the production domain]
	site: site.url,

	// `hybrid` prerenders every page to static HTML by default and renders on
	// demand only where a route sets `export const prerender = false`. That is
	// just src/pages/api/contact.ts, so the contact form runs as a serverless
	// function while the rest of the site is served straight from the CDN.
	output: 'hybrid',
	adapter: vercel(),

	// `security.checkOrigin` is deliberately left off. It is Astro's built-in
	// CSRF check, but in Astro 4 it reads request headers for *every* prerendered
	// route, which makes the build emit one warning per page. The same check is
	// done explicitly in src/pages/api/contact.ts, where it can also return a
	// useful message to the submitter.

	integrations: [sitemap(), mdx(), lit(), icon()],

	image: {
		// Match the sizes the hero actually renders at, so Astro ships a
		// correctly sized file instead of a 1280px original on a phone.
		responsiveStyles: true,
	},

	build: {
		inlineStylesheets: 'auto',
	},
});
