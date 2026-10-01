import 'resend';
import { s as site } from '../../chunks/site_BpwYE_mC.mjs';
import { p as projectTypes, b as budgetRanges } from '../../chunks/form-options_etW2JOv7.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const MIN_FILL_TIME_MS = 2500;
const LIMITS = {
  name: 120,
  email: 200,
  message: 5e3
};
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function clean(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength);
}
function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
function isSameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}
const POST = async ({ request }) => {
  if (!isSameOrigin(request)) {
    return json({ message: "Cross-site submissions are not accepted." }, 403);
  }
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/x-www-form-urlencoded") && !contentType.includes("multipart/form-data")) {
    return json({ message: "Unsupported content type." }, 415);
  }
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ message: "Could not read the submitted form." }, 400);
  }
  if (clean(form.get("company_website"), 200).length > 0) {
    return json({
      ok: true,
      message: "Thanks — your message has been received."
    });
  }
  const renderedAt = Number.parseInt(clean(form.get("rendered_at"), 20), 10);
  if (Number.isFinite(renderedAt) && Date.now() - renderedAt < MIN_FILL_TIME_MS) {
    return json({
      ok: true,
      message: "Thanks — your message has been received."
    });
  }
  const name = clean(form.get("name"), LIMITS.name);
  const email = clean(form.get("email"), LIMITS.email);
  const message = clean(form.get("message"), LIMITS.message);
  const projectTypeRaw = clean(form.get("projectType"), 80);
  const budgetRaw = clean(form.get("budget"), 40);
  const consent = form.get("consent");
  const errors = {};
  if (name.length < 2) {
    errors.name = "Please tell us your name.";
  }
  if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address so we can reply.";
  }
  if (!projectTypes.includes(projectTypeRaw)) {
    errors.projectType = "Please choose a project type.";
  }
  if (!budgetRanges.includes(budgetRaw)) {
    errors.budget = "Please choose a budget range.";
  }
  if (message.length < 20) {
    errors.message = "Please add a little more detail (at least 20 characters).";
  }
  if (consent !== "yes") {
    errors.consent = "Please accept the privacy notice so we can respond.";
  }
  if (Object.keys(errors).length > 0) {
    return json(
      {
        message: "Some fields need attention. Please check the form and try again.",
        errors
      },
      422
    );
  }
  const to = site.email;
  {
    console.error(
      "[contact] RESEND_API_KEY and CONTACT_FROM_EMAIL must be set to send inquiries."
    );
    return json(
      {
        message: `The form is not configured yet. Please email us directly at ${to}.`
      },
      503
    );
  }
};
const ALL = () => json({ message: "Method not allowed." }, 405);

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ALL,
	POST,
	prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
