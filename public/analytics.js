/**
 * Loads Plausible Analytics, but only when both conditions hold:
 *
 *   1. The site is configured with a domain (the server emits the
 *      <meta name="plausible-domain"> tag only when PUBLIC_PLAUSIBLE_DOMAIN is
 *      set), and
 *   2. The visitor has not opted out on /cookie-preferences.
 *
 * Injecting the tag from script keeps the analytics domain out of the script
 * itself, which means the Content-Security-Policy only ever needs
 * script-src 'self' https://plausible.io — no hashes to keep in sync and no
 * 'unsafe-inline'.
 */
(function () {
	var meta = document.querySelector('meta[name="plausible-domain"]');
	if (!meta) return;

	var domain = meta.getAttribute('content');
	if (!domain) return;

	try {
		if (localStorage.getItem('analytics-consent') === 'denied') return;
	} catch (e) {
		// Storage blocked: the visitor has not opted out, so continue.
	}

	var script = document.createElement('script');
	script.defer = true;
	script.dataset.domain = domain;
	script.src = 'https://plausible.io/js/script.js';
	document.head.appendChild(script);
})();
