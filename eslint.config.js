import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

/**
 * Flat ESLint config. Covers every file the build touches, including .astro
 * frontmatter and client scripts, so `npm run lint` fails on the same problems
 * `astro check` does.
 */
const browserGlobals = {
	Astro: 'readonly',
	window: 'readonly',
	document: 'readonly',
	localStorage: 'readonly',
	matchMedia: 'readonly',
	navigator: 'readonly',
	console: 'readonly',
	fetch: 'readonly',
	FormData: 'readonly',
	FormDataEntryValue: 'readonly',
	Headers: 'readonly',
	Response: 'readonly',
	Request: 'readonly',
	URL: 'readonly',
	URLSearchParams: 'readonly',
	setTimeout: 'readonly',
	clearTimeout: 'readonly',
	HTMLElement: 'readonly',
	HTMLInputElement: 'readonly',
	HTMLButtonElement: 'readonly',
	HTMLAnchorElement: 'readonly',
	HTMLImageElement: 'readonly',
	HTMLFormElement: 'readonly',
	HTMLSelectElement: 'readonly',
	HTMLTextAreaElement: 'readonly',
	Element: 'readonly',
	Node: 'readonly',
	IntersectionObserver: 'readonly',
};

export default [
	{
		ignores: [
			'.vercel/**',
			'node_modules/**',
			'dist/**',
			'.astro/**',
			'public/**',
			'**/*.d.ts',
		],
	},

	js.configs.recommended,
	...astro.configs['flat/recommended'],

	{
		languageOptions: {
			globals: { ...browserGlobals, process: 'readonly' },
		},
		rules: {
			'no-unused-vars': 'off',
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			eqeqeq: ['error', 'smart'],
			'prefer-const': 'error',
			'object-shorthand': 'warn',
		},
	},

	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		plugins: { '@typescript-eslint': tsPlugin },
		rules: {
			// TypeScript resolves identifiers and types itself, and reports
			// genuinely undefined ones, so the base rule is noise here.
			'no-undef': 'off',
			'no-console': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
		},
	},

	{
		// Sanitising untrusted input means deliberately matching control
		// characters, which is exactly what this rule forbids elsewhere.
		files: ['src/pages/api/contact.ts'],
		rules: {
			'no-control-regex': 'off',
		},
	},

	{
		files: ['**/*.astro'],
		rules: {
			// Off: the rule cannot see classes applied through `class:list`,
			// `set:html` or the client scripts (`.is-open`, `.is-dark`,
			// `aria-current`), so it reports dozens of false positives.
			'astro/no-unused-css-selector': 'off',
		},
	},

	{
		// Node scripts legitimately report progress on stdout.
		files: ['scripts/**/*.mjs'],
		languageOptions: {
			globals: {
				Buffer: 'readonly',
				console: 'readonly',
				process: 'readonly',
			},
		},
		rules: {
			'no-console': 'off',
		},
	},
];
