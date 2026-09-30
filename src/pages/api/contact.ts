import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { site } from '../../config/site';
import { projectTypes, budgetRanges } from '../../data/form-options';

export const prerender = false;

/**
 * POST /api/contact
 *
 * Accepts the project inquiry form, validates every field server-side, applies
 * two layers of spam defence (a honeypot that bots fill in and a minimum
 * fill-time check), rejects cross-site posts, then forwards the message to the
 * studio inbox through Resend.
 *
 * No field is trusted from the client: the submitted project type and budget
 * range are matched against the allow-lists in src/data/form-options.ts rather
 * than echoed back into the email.
 */

/** Submissions completed faster than this are treated as automated. */
const MIN_FILL_TIME_MS = 2500;

const LIMITS = {
	name: 120,
	email: 200,
	message: 5000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Strips control characters, collapses whitespace and truncates, so a value is
 * always safe to log, mail, or echo into an error message.
 */
function clean(value: FormDataEntryValue | null, maxLength: number): string {
	if (typeof value !== 'string') return '';
	return value
		.replace(/[\u0000-\u001F\u007F]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.slice(0, maxLength);
}

function json(body: Record<string, unknown>, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			'content-type': 'application/json; charset=utf-8',
			'cache-control': 'no-store',
		},
	});
}

/** Escapes text before it goes into the HTML email body. */
function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

/**
 * Rejects cross-site form posts (CSRF).
 *
 * Browsers send `Origin` on every POST, so a mismatch means the submission came
 * from another site. A missing `Origin` is allowed rather than blocked, because
 * some privacy tools and older clients strip it and we would rather serve those
 * than lock out a real inquiry — the honeypot and fill-time checks still apply.
 *
 * Done here rather than via `security.checkOrigin` because in Astro 4 that
 * option reads request headers for every prerendered route, which floods the
 * build log with a warning per page.
 */
function isSameOrigin(request: Request): boolean {
	const origin = request.headers.get('origin');
	if (!origin) return true;
	try {
		return new URL(origin).origin === new URL(request.url).origin;
	} catch {
		return false;
	}
}

export const POST: APIRoute = async ({ request }) => {
	if (!isSameOrigin(request)) {
		return json({ message: 'Cross-site submissions are not accepted.' }, 403);
	}

	const contentType = request.headers.get('content-type') ?? '';
	if (
		!contentType.includes('application/x-www-form-urlencoded') &&
		!contentType.includes('multipart/form-data')
	) {
		return json({ message: 'Unsupported content type.' }, 415);
	}

	let form: FormData;
	try {
		form = await request.formData();
	} catch {
		return json({ message: 'Could not read the submitted form.' }, 400);
	}

	// --- Spam defence -----------------------------------------------------
	// Honeypot: a real user cannot see or focus this field, so any value is a bot.
	// Respond 200 so the bot is not told it was caught, but send nothing.
	if (clean(form.get('company_website'), 200).length > 0) {
		return json({
			ok: true,
			message: 'Thanks — your message has been received.',
		});
	}

	// Minimum fill time: humans cannot read and complete the form instantly.
	const renderedAt = Number.parseInt(clean(form.get('rendered_at'), 20), 10);
	if (
		Number.isFinite(renderedAt) &&
		Date.now() - renderedAt < MIN_FILL_TIME_MS
	) {
		return json({
			ok: true,
			message: 'Thanks — your message has been received.',
		});
	}

	// --- Validation -------------------------------------------------------
	const name = clean(form.get('name'), LIMITS.name);
	const email = clean(form.get('email'), LIMITS.email);
	const message = clean(form.get('message'), LIMITS.message);
	const projectTypeRaw = clean(form.get('projectType'), 80);
	const budgetRaw = clean(form.get('budget'), 40);
	const consent = form.get('consent');

	const errors: Record<string, string> = {};

	if (name.length < 2) {
		errors.name = 'Please tell us your name.';
	}
	if (!EMAIL_PATTERN.test(email)) {
		errors.email = 'Please enter a valid email address so we can reply.';
	}
	if (!projectTypes.includes(projectTypeRaw as (typeof projectTypes)[number])) {
		errors.projectType = 'Please choose a project type.';
	}
	if (!budgetRanges.includes(budgetRaw as (typeof budgetRanges)[number])) {
		errors.budget = 'Please choose a budget range.';
	}
	if (message.length < 20) {
		errors.message =
			'Please add a little more detail (at least 20 characters).';
	}
	if (consent !== 'yes') {
		errors.consent = 'Please accept the privacy notice so we can respond.';
	}

	if (Object.keys(errors).length > 0) {
		return json(
			{
				message:
					'Some fields need attention. Please check the form and try again.',
				errors,
			},
			422,
		);
	}

	// --- Delivery ---------------------------------------------------------
	const apiKey = import.meta.env.RESEND_API_KEY;
	const to = import.meta.env.CONTACT_TO_EMAIL ?? site.email;
	const from = import.meta.env.CONTACT_FROM_EMAIL;

	if (!apiKey || !from) {
		// Local/preview builds have no mail credentials. Do not silently drop
		// the message and report success.
		console.error(
			'[contact] RESEND_API_KEY and CONTACT_FROM_EMAIL must be set to send inquiries.',
		);
		return json(
			{
				message: `The form is not configured yet. Please email us directly at ${to}.`,
			},
			503,
		);
	}

	const resend = new Resend(apiKey);
	const subject = `New project inquiry — ${projectTypeRaw} — ${name}`;
	const receivedAt = new Date().toISOString();

	const { error } = await resend.emails.send({
		from,
		to: [to],
		replyTo: email,
		subject,
		text: [
			`Name: ${name}`,
			`Email: ${email}`,
			`Project type: ${projectTypeRaw}`,
			`Budget range: ${budgetRaw}`,
			`Received: ${receivedAt}`,
			'',
			'Message:',
			message,
		].join('\n'),
		html: `
			<h1 style="font-size:20px;margin:0 0 16px">New project inquiry</h1>
			<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:15px">
				<tr><td style="padding:4px 12px 4px 0;color:#555">Name</td><td style="padding:4px 0"><strong>${escapeHtml(name)}</strong></td></tr>
				<tr><td style="padding:4px 12px 4px 0;color:#555">Email</td><td style="padding:4px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
				<tr><td style="padding:4px 12px 4px 0;color:#555">Project type</td><td style="padding:4px 0">${escapeHtml(projectTypeRaw)}</td></tr>
				<tr><td style="padding:4px 12px 4px 0;color:#555">Budget range</td><td style="padding:4px 0">${escapeHtml(budgetRaw)}</td></tr>
				<tr><td style="padding:4px 12px 4px 0;color:#555">Received</td><td style="padding:4px 0">${escapeHtml(receivedAt)}</td></tr>
			</table>
			<h2 style="font-size:16px;margin:24px 0 8px">Message</h2>
			<p style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</p>
		`.trim(),
	});

	if (error) {
		console.error('[contact] Resend rejected the message:', error.message);
		return json(
			{
				message:
					'We could not send your message just now. Please email us directly and we will pick it up from there.',
			},
			502,
		);
	}

	return json(
		{
			ok: true,
			message:
				'Thanks — your message has been sent. We reply to every inquiry within one business day.',
		},
		200,
	);
};

export const ALL: APIRoute = () =>
	json({ message: 'Method not allowed.' }, 405);
