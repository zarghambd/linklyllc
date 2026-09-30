/**
 * Regenerates the raster brand assets that browsers require as PNG.
 *
 * Source artwork lives in `public/og-image-source.svg` so the design can be
 * edited as text; sharp rasterises it. The square icons are derived from the
 * same gradient as `public/favicon.svg` so the installed app icon, the home
 * screen icon and the browser tab icon stay consistent. Maskable variants keep
 * the monogram inside the 80% safe zone Android crops to, so the gradient can
 * bleed to the edges without clipping the letter.
 *
 * Run with: npm run generate:assets
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');

/** Square icon artwork. `inset` shrinks the monogram for maskable variants. */
function squareIcon({ size, inset = 0 }) {
	const unit = 180;
	const scale = (1 - inset * 2) / 1;
	return Buffer.from(
		`<svg xmlns="http://www.w3.org/2000/svg" width="${unit}" height="${unit}" viewBox="0 0 ${unit} ${unit}">
			<defs>
				<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0" stop-color="#7c3aed" />
					<stop offset="1" stop-color="#1d4ed8" />
				</linearGradient>
			</defs>
			<rect width="${unit}" height="${unit}" fill="url(#g)" />
			<g transform="translate(${unit / 2} ${unit / 2}) scale(${scale}) translate(${-unit / 2} ${-unit / 2})">
				<path d="M66 46v88h52v-20H86V46z" fill="#fff" />
			</g>
		</svg>`,
	);
}

const written = [];

const ogSource = await readFile(join(publicDir, 'og-image-source.svg'));
written.push([
	'og-image.png',
	await sharp(ogSource, { density: 144 })
		.resize(1200, 630)
		.png({ compressionLevel: 9 })
		.toBuffer(),
]);

for (const [name, size, inset] of [
	['apple-touch-icon.png', 180, 0],
	['icon-192.png', 192, 0],
	['icon-512.png', 512, 0],
	['icon-maskable-512.png', 512, 0.14],
]) {
	written.push([
		name,
		await sharp(squareIcon({ size, inset }))
			.resize(size, size)
			.png({ compressionLevel: 9 })
			.toBuffer(),
	]);
}

for (const [name, buffer] of written) {
	await writeFile(join(publicDir, name), buffer);
}

console.log(`Generated: ${written.map(([name]) => name).join(', ')}`);
