/**
 * Checks every internal link in the built site against the files that were
 * actually emitted, including in-page anchors.
 *
 * Run after `npm run build`: npm run check:links
 */
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, sep } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const staticDir = join(root, '.vercel/output/static');

/** Every emitted file, as a set of URL paths without a leading slash. */
async function collectFiles(dir, base = '') {
	const files = new Set();
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);
		const url = base === '' ? entry.name : `${base}/${entry.name}`;
		if (entry.isDirectory()) {
			for (const nested of await collectFiles(path, url)) files.add(nested);
		} else {
			files.add(url);
		}
	}
	return files;
}

const emitted = await collectFiles(staticDir);

/** Maps a request path to the file that would be served for it. */
function resolves(href) {
	const clean = href.replace(/^\/+/, '').replace(/\/+$/, '');
	if (clean === '') return 'index.html';
	if (emitted.has(clean)) return clean;
	if (emitted.has(`${clean}/index.html`)) return `${clean}/index.html`;
	return null;
}

const htmlFiles = [...emitted].filter(file => file.endsWith('.html'));

const failures = [];
let checked = 0;

for (const page of htmlFiles) {
	const html = await readFile(join(staticDir, page), 'utf8');

	for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
		const raw = match[1];
		if (raw.startsWith('//')) continue;

		const [path, fragment] = raw.split('#');
		const target = resolves(path);
		checked += 1;

		if (!target) {
			failures.push(`BROKEN  ${page} -> ${raw}`);
			continue;
		}

		if (fragment && target.endsWith('.html')) {
			const targetHtml = await readFile(join(staticDir, target), 'utf8');
			const id = fragment.split('?')[0];
			if (
				!targetHtml.includes(`id="${id}"`) &&
				// Same-page fragment.
				!html.includes(`id="${id}"`)
			) {
				failures.push(`ANCHOR  ${page} -> ${raw}`);
			}
		}
	}
}

if (failures.length > 0) {
	console.error(`${failures.length} broken of ${checked} internal links:\n`);
	for (const failure of failures) console.error(`  ${failure}`);
	process.exit(1);
}

console.log(
	`All ${checked} internal links across ${htmlFiles.length} pages resolve.`,
);
console.log(`\nPages (${htmlFiles.length}):`);
for (const page of htmlFiles.sort())
	console.log(
		`  ${relative(staticDir, join(staticDir, page)).split(sep).join('/')}`,
	);
