import * as Sentry from "@sentry/sveltekit";

Sentry.init({
  dsn: "https://4dcd95d5f20b17ded6ac44807969c427@o305395.ingest.us.sentry.io/4511205459427328",

  // Errors only — no performance tracing
  tracesSampleRate: 0,

  // Strip breadcrumbs that could leak user interaction details
  beforeBreadcrumb(breadcrumb) {
    // Keep fetch/xhr errors and console.error for debugging context
    if (breadcrumb.category === "console" && breadcrumb.level !== "error") return null;
    // Drop DOM click breadcrumbs (could contain element text)
    if (breadcrumb.category === "ui.click") return null;
    return breadcrumb;
  },

  // Scrub IP address from events (belt-and-suspenders with project setting)
  beforeSend(event) {
    if (event.user) {
      delete event.user.ip_address;
    }
    return event;
  },
});

export const handleError = Sentry.handleErrorWithSentry();
