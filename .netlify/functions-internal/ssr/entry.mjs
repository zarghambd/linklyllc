import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_C8Nxsp05.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/ai-agents.astro.mjs');
const _page4 = () => import('./pages/api/contact.astro.mjs');
const _page5 = () => import('./pages/contact.astro.mjs');
const _page6 = () => import('./pages/cookie-preferences.astro.mjs');
const _page7 = () => import('./pages/mobile-apps.astro.mjs');
const _page8 = () => import('./pages/privacy-policy.astro.mjs');
const _page9 = () => import('./pages/refund-policy.astro.mjs');
const _page10 = () => import('./pages/services.astro.mjs');
const _page11 = () => import('./pages/stack.astro.mjs');
const _page12 = () => import('./pages/terms-of-service.astro.mjs');
const _page13 = () => import('./pages/work.astro.mjs');
const _page14 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/ai-agents.astro", _page3],
    ["src/pages/api/contact.ts", _page4],
    ["src/pages/contact.astro", _page5],
    ["src/pages/cookie-preferences.astro", _page6],
    ["src/pages/mobile-apps.astro", _page7],
    ["src/pages/privacy-policy.astro", _page8],
    ["src/pages/refund-policy.astro", _page9],
    ["src/pages/services.astro", _page10],
    ["src/pages/stack.astro", _page11],
    ["src/pages/terms-of-service.astro", _page12],
    ["src/pages/work.astro", _page13],
    ["src/pages/index.astro", _page14]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
