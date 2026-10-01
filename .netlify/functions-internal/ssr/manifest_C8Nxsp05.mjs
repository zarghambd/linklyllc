import 'cookie';
import 'kleur/colors';
import 'devalue';
import 'es-module-lexer';
import { g as decodeKey } from './chunks/astro/server_PvR5leAJ.mjs';
import 'clsx';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = (_, next) => next();

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Zargham_01/Documents/odyssey-theme-main/odyssey-theme-main/","adapterName":"@astrojs/netlify","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"ai-agents/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/ai-agents","isIndex":false,"type":"page","pattern":"^\\/ai-agents\\/?$","segments":[[{"content":"ai-agents","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ai-agents.astro","pathname":"/ai-agents","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"cookie-preferences/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cookie-preferences","isIndex":false,"type":"page","pattern":"^\\/cookie-preferences\\/?$","segments":[[{"content":"cookie-preferences","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cookie-preferences.astro","pathname":"/cookie-preferences","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"mobile-apps/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/mobile-apps","isIndex":false,"type":"page","pattern":"^\\/mobile-apps\\/?$","segments":[[{"content":"mobile-apps","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/mobile-apps.astro","pathname":"/mobile-apps","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"privacy-policy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy-policy","isIndex":false,"type":"page","pattern":"^\\/privacy-policy\\/?$","segments":[[{"content":"privacy-policy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy-policy.astro","pathname":"/privacy-policy","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"refund-policy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/refund-policy","isIndex":false,"type":"page","pattern":"^\\/refund-policy\\/?$","segments":[[{"content":"refund-policy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/refund-policy.astro","pathname":"/refund-policy","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"services/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/services","isIndex":false,"type":"page","pattern":"^\\/services\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services.astro","pathname":"/services","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"stack/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/stack","isIndex":false,"type":"page","pattern":"^\\/stack\\/?$","segments":[[{"content":"stack","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/stack.astro","pathname":"/stack","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"terms-of-service/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terms-of-service","isIndex":false,"type":"page","pattern":"^\\/terms-of-service\\/?$","segments":[[{"content":"terms-of-service","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms-of-service.astro","pathname":"/terms-of-service","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"work/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/work","isIndex":false,"type":"page","pattern":"^\\/work\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work.astro","pathname":"/work","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"/** @license Copyright 2020 Google LLC (BSD-3-Clause) */\n/** Bundled JS generated from \"@astrojs/lit/client-shim.js\" */\nvar N = Object.defineProperty;\nvar i = (t, n) => () => (t && (n = t((t = 0))), n);\nvar b = (t, n) => {\n\tfor (var a in n) N(t, a, { get: n[a], enumerable: !0 });\n};\nfunction s() {\n\tif (d === void 0) {\n\t\tlet t = document.createElement('div');\n\t\t(t.innerHTML = '<div><template shadowroot=\"open\" shadowrootmode=\"open\"></template></div>'),\n\t\t\t(d = !!t.firstElementChild.shadowRoot);\n\t}\n\treturn d;\n}\nvar d,\n\tm = i(() => {});\nvar p,\n\tc,\n\tf,\n\tu = i(() => {\n\t\t(p = (t) => t.parentElement === null),\n\t\t\t(c = (t) => t.tagName === 'TEMPLATE'),\n\t\t\t(f = (t) => t.nodeType === Node.ELEMENT_NODE);\n\t});\nvar h,\n\tE = i(() => {\n\t\tm();\n\t\tu();\n\t\th = (t) => {\n\t\t\tvar n;\n\t\t\tif (s()) return;\n\t\t\tlet a = [],\n\t\t\t\te = t.firstElementChild;\n\t\t\tfor (; e !== t && e !== null; )\n\t\t\t\tif (c(e)) a.push(e), (e = e.content);\n\t\t\t\telse if (e.firstElementChild !== null) e = e.firstElementChild;\n\t\t\t\telse if (f(e) && e.nextElementSibling !== null) e = e.nextElementSibling;\n\t\t\t\telse {\n\t\t\t\t\tlet o;\n\t\t\t\t\tfor (; e !== t && e !== null; )\n\t\t\t\t\t\tif (p(e)) {\n\t\t\t\t\t\t\to = a.pop();\n\t\t\t\t\t\t\tlet r = o.parentElement,\n\t\t\t\t\t\t\t\tl = o.getAttribute('shadowroot');\n\t\t\t\t\t\t\tif (((e = o), l === 'open' || l === 'closed')) {\n\t\t\t\t\t\t\t\tlet y = o.hasAttribute('shadowrootdelegatesfocus');\n\t\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\t\tr.attachShadow({ mode: l, delegatesFocus: y }).append(o.content);\n\t\t\t\t\t\t\t\t} catch {}\n\t\t\t\t\t\t\t} else o = void 0;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tlet r = e.nextElementSibling;\n\t\t\t\t\t\t\tif (r != null) {\n\t\t\t\t\t\t\t\t(e = r), o !== void 0 && o.parentElement.removeChild(o);\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tlet l =\n\t\t\t\t\t\t\t\t(n = e.parentElement) === null || n === void 0 ? void 0 : n.nextElementSibling;\n\t\t\t\t\t\t\tif (l != null) {\n\t\t\t\t\t\t\t\t(e = l), o !== void 0 && o.parentElement.removeChild(o);\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t(e = e.parentElement), o !== void 0 && (o.parentElement.removeChild(o), (o = void 0));\n\t\t\t\t\t\t}\n\t\t\t\t}\n\t\t};\n\t});\nvar w = i(() => {\n\tE();\n});\nvar v = {};\nb(v, { hasNativeDeclarativeShadowRoots: () => s, hydrateShadowRoots: () => h });\nvar S = i(() => {\n\tm();\n\tw();\n});\nasync function g() {\n\tlet { hydrateShadowRoots: t } = await Promise.resolve().then(() => (S(), v));\n\twindow.addEventListener('DOMContentLoaded', () => t(document.body), { once: true });\n}\nvar x = new DOMParser()\n\t.parseFromString(\n\t\t'<p><template shadowroot=\"open\" shadowrootmode=\"open\"></template></p>',\n\t\t'text/html',\n\t\t{\n\t\t\tincludeShadowRoots: !0,\n\t\t}\n\t)\n\t.querySelector('p');\n(!x || !x.shadowRoot) && g();\n"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"/** @license Copyright 2020 Google LLC (BSD-3-Clause) */\n/** Bundled JS generated from \"@astrojs/lit/client-shim.js\" */\nvar N = Object.defineProperty;\nvar i = (t, n) => () => (t && (n = t((t = 0))), n);\nvar b = (t, n) => {\n\tfor (var a in n) N(t, a, { get: n[a], enumerable: !0 });\n};\nfunction s() {\n\tif (d === void 0) {\n\t\tlet t = document.createElement('div');\n\t\t(t.innerHTML = '<div><template shadowroot=\"open\" shadowrootmode=\"open\"></template></div>'),\n\t\t\t(d = !!t.firstElementChild.shadowRoot);\n\t}\n\treturn d;\n}\nvar d,\n\tm = i(() => {});\nvar p,\n\tc,\n\tf,\n\tu = i(() => {\n\t\t(p = (t) => t.parentElement === null),\n\t\t\t(c = (t) => t.tagName === 'TEMPLATE'),\n\t\t\t(f = (t) => t.nodeType === Node.ELEMENT_NODE);\n\t});\nvar h,\n\tE = i(() => {\n\t\tm();\n\t\tu();\n\t\th = (t) => {\n\t\t\tvar n;\n\t\t\tif (s()) return;\n\t\t\tlet a = [],\n\t\t\t\te = t.firstElementChild;\n\t\t\tfor (; e !== t && e !== null; )\n\t\t\t\tif (c(e)) a.push(e), (e = e.content);\n\t\t\t\telse if (e.firstElementChild !== null) e = e.firstElementChild;\n\t\t\t\telse if (f(e) && e.nextElementSibling !== null) e = e.nextElementSibling;\n\t\t\t\telse {\n\t\t\t\t\tlet o;\n\t\t\t\t\tfor (; e !== t && e !== null; )\n\t\t\t\t\t\tif (p(e)) {\n\t\t\t\t\t\t\to = a.pop();\n\t\t\t\t\t\t\tlet r = o.parentElement,\n\t\t\t\t\t\t\t\tl = o.getAttribute('shadowroot');\n\t\t\t\t\t\t\tif (((e = o), l === 'open' || l === 'closed')) {\n\t\t\t\t\t\t\t\tlet y = o.hasAttribute('shadowrootdelegatesfocus');\n\t\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\t\tr.attachShadow({ mode: l, delegatesFocus: y }).append(o.content);\n\t\t\t\t\t\t\t\t} catch {}\n\t\t\t\t\t\t\t} else o = void 0;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tlet r = e.nextElementSibling;\n\t\t\t\t\t\t\tif (r != null) {\n\t\t\t\t\t\t\t\t(e = r), o !== void 0 && o.parentElement.removeChild(o);\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tlet l =\n\t\t\t\t\t\t\t\t(n = e.parentElement) === null || n === void 0 ? void 0 : n.nextElementSibling;\n\t\t\t\t\t\t\tif (l != null) {\n\t\t\t\t\t\t\t\t(e = l), o !== void 0 && o.parentElement.removeChild(o);\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t(e = e.parentElement), o !== void 0 && (o.parentElement.removeChild(o), (o = void 0));\n\t\t\t\t\t\t}\n\t\t\t\t}\n\t\t};\n\t});\nvar w = i(() => {\n\tE();\n});\nvar v = {};\nb(v, { hasNativeDeclarativeShadowRoots: () => s, hydrateShadowRoots: () => h });\nvar S = i(() => {\n\tm();\n\tw();\n});\nasync function g() {\n\tlet { hydrateShadowRoots: t } = await Promise.resolve().then(() => (S(), v));\n\twindow.addEventListener('DOMContentLoaded', () => t(document.body), { once: true });\n}\nvar x = new DOMParser()\n\t.parseFromString(\n\t\t'<p><template shadowroot=\"open\" shadowrootmode=\"open\"></template></p>',\n\t\t'text/html',\n\t\t{\n\t\t\tincludeShadowRoots: !0,\n\t\t}\n\t)\n\t.querySelector('p');\n(!x || !x.shadowRoot) && g();\n"}],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.ts","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://www.linklyllc.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Zargham_01/Documents/odyssey-theme-main/odyssey-theme-main/src/pages/privacy-policy.astro",{"propagation":"none","containsHead":true}],["C:/Users/Zargham_01/Documents/odyssey-theme-main/odyssey-theme-main/src/pages/refund-policy.astro",{"propagation":"none","containsHead":true}],["C:/Users/Zargham_01/Documents/odyssey-theme-main/odyssey-theme-main/src/pages/terms-of-service.astro",{"propagation":"none","containsHead":true}],["C:/Users/Zargham_01/Documents/odyssey-theme-main/odyssey-theme-main/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/Zargham_01/Documents/odyssey-theme-main/odyssey-theme-main/src/pages/about.astro",{"propagation":"none","containsHead":true}],["C:/Users/Zargham_01/Documents/odyssey-theme-main/odyssey-theme-main/src/pages/ai-agents.astro",{"propagation":"none","containsHead":true}],["C:/Users/Zargham_01/Documents/odyssey-theme-main/odyssey-theme-main/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["C:/Users/Zargham_01/Documents/odyssey-theme-main/odyssey-theme-main/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Zargham_01/Documents/odyssey-theme-main/odyssey-theme-main/src/pages/mobile-apps.astro",{"propagation":"none","containsHead":true}],["C:/Users/Zargham_01/Documents/odyssey-theme-main/odyssey-theme-main/src/pages/services.astro",{"propagation":"none","containsHead":true}],["C:/Users/Zargham_01/Documents/odyssey-theme-main/odyssey-theme-main/src/pages/stack.astro",{"propagation":"none","containsHead":true}],["C:/Users/Zargham_01/Documents/odyssey-theme-main/odyssey-theme-main/src/pages/work.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/ai-agents@_@astro":"pages/ai-agents.astro.mjs","\u0000@astro-page:src/pages/api/contact@_@ts":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/cookie-preferences@_@astro":"pages/cookie-preferences.astro.mjs","\u0000@astro-page:src/pages/mobile-apps@_@astro":"pages/mobile-apps.astro.mjs","\u0000@astro-page:src/pages/privacy-policy@_@astro":"pages/privacy-policy.astro.mjs","\u0000@astro-page:src/pages/refund-policy@_@astro":"pages/refund-policy.astro.mjs","\u0000@astro-page:src/pages/services@_@astro":"pages/services.astro.mjs","\u0000@astro-page:src/pages/stack@_@astro":"pages/stack.astro.mjs","\u0000@astro-page:src/pages/terms-of-service@_@astro":"pages/terms-of-service.astro.mjs","\u0000@astro-page:src/pages/work@_@astro":"pages/work.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_C8Nxsp05.mjs","@astrojs/lit/dist/client.js":"_astro/client.DEGHhFmz.js","/astro/hoisted.js?q=1":"_astro/hoisted.Dc_kOnUX.js","/astro/hoisted.js?q=3":"_astro/hoisted.XKnXz6oY.js","/astro/hoisted.js?q=0":"_astro/hoisted.dTEH36lb.js","astro:scripts/before-hydration.js":"_astro/astro_scripts/before-hydration.js.DQFB1rJZ.js","/astro/hoisted.js?q=2":"_astro/hoisted.4gDY9UvE.js"},"inlinedScripts":[],"assets":["/_astro/landing-hero.XgYd6QhH.png","/_astro/linkly-logo.TtDB4RvQ.png","/_astro/contact.D3IWGY9Y.css","/_astro/privacy-policy.C65StwHa.css","/analytics.js","/apple-touch-icon.png","/favicon.svg","/icon-192.png","/icon-512.png","/icon-maskable-512.png","/landing-hero.png","/linkly-logo.png","/linkly.ico","/og-image-source.svg","/og-image.png","/robots.txt","/site.webmanifest","/theme-init.js","/assets/custom-svg.svg","/_astro/client.DEGHhFmz.js","/_astro/hoisted.4gDY9UvE.js","/_astro/hoisted.Dc_kOnUX.js","/_astro/hoisted.XKnXz6oY.js","/assets/fonts/lato-v23-latin-300.woff","/assets/fonts/lato-v23-latin-300.woff2","/assets/fonts/lato-v23-latin-700.woff","/assets/fonts/lato-v23-latin-700.woff2","/assets/fonts/lato-v23-latin-700italic.woff","/assets/fonts/lato-v23-latin-700italic.woff2","/assets/fonts/lato-v23-latin-regular.woff","/assets/fonts/lato-v23-latin-regular.woff2","/assets/fonts/roboto-serif-v8-latin-600.woff","/assets/fonts/roboto-serif-v8-latin-600.woff2","/assets/fonts/roboto-serif-v8-latin-700.woff","/assets/fonts/roboto-serif-v8-latin-700.woff2","/assets/images/blog-page-screenshot.png","/assets/images/blog-post-screenshot.png","/assets/images/company-legal-screenshot.png","/assets/images/hero-waves.jpg","/assets/images/placeholder-screenshot.png","/_astro/astro_scripts/before-hydration.js.DQFB1rJZ.js","/assets/images/badges/open-in-codesandbox.svg","/assets/images/badges/open-in-gitpod.svg","/assets/images/home/classic-hero.jpg","/assets/images/home/dark-hero.jpg","/assets/images/home/earth-hero.jpg","/assets/images/home/ocean-hero.jpg","/assets/images/home/sand-hero.jpg","/assets/images/landing-1/landing-hero-1.jpg","/assets/images/landing-1/landing-sticky.jpg","/assets/images/blog/consider-hybrid-work/featured.jpg","/assets/images/blog/odyssey-theme-officially-released/featured.jpg","/assets/images/blog/remote-work-mental-health/featured.jpg","/assets/images/home/screenshots/about.png","/assets/images/home/screenshots/about.webp","/assets/images/home/screenshots/blog-post.png","/assets/images/home/screenshots/blog-post.webp","/assets/images/home/screenshots/blog.png","/assets/images/home/screenshots/blog.webp","/assets/images/home/screenshots/contact.png","/assets/images/home/screenshots/contact.webp","/assets/images/home/screenshots/get-started.png","/assets/images/home/screenshots/get-started.webp","/assets/images/home/screenshots/landing-1.png","/assets/images/home/screenshots/landing-1.webp","/assets/images/home/screenshots/landing-2.png","/assets/images/home/screenshots/landing-2.webp","/assets/images/home/screenshots/landing-3.png","/assets/images/home/screenshots/landing-3.webp","/assets/images/home/screenshots/legal.png","/assets/images/home/screenshots/legal.webp","/assets/images/home/screenshots/style-guide.png","/assets/images/home/screenshots/style-guide.webp","/404.html","/about/index.html","/ai-agents/index.html","/contact/index.html","/cookie-preferences/index.html","/mobile-apps/index.html","/privacy-policy/index.html","/refund-policy/index.html","/services/index.html","/stack/index.html","/terms-of-service/index.html","/work/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"5NOwFm+CUHysu5QI9SBYfH+u7yjpNJ8pnqtglXR7hmc=","experimentalEnvGetSecretEnabled":false});

export { manifest };
