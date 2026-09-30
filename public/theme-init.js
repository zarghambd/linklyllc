/**
 * Applies the saved theme before first paint so the page never flashes the
 * wrong colour scheme. Loaded as a blocking script in <head> (no defer, no
 * async) precisely so it runs before anything is painted.
 *
 * Kept as a static file rather than an inline script so the Content-Security
 * Policy can use script-src 'self' with no 'unsafe-inline' escape hatch.
 */
(function () {
	var root = document.documentElement;
	try {
		var stored = localStorage.getItem('theme');
		if (stored === 'dark' || stored === 'default') {
			root.dataset.theme = stored;
			return;
		}
		root.dataset.theme = window.matchMedia('(prefers-color-scheme: dark)')
			.matches
			? 'dark'
			: 'default';
	} catch (e) {
		// Storage blocked (private mode, strict cookies): fall back to light.
		root.dataset.theme = 'default';
	}
})();
