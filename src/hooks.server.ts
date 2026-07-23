import { initCloudflareSentryHandle, sentryHandle, handleErrorWithSentry } from "@sentry/sveltekit";
import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";

const noTransformHandle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("text/html")) {
    const current = response.headers.get("cache-control");
    if (!current) {
      response.headers.set("cache-control", "public, max-age=0, must-revalidate, no-transform");
    } else if (!current.includes("no-transform")) {
      response.headers.set("cache-control", `${current}, no-transform`);
    }
  }
  return response;
};

export const handle = sequence(
  initCloudflareSentryHandle({
    dsn: "https://4dcd95d5f20b17ded6ac44807969c427@o305395.ingest.us.sentry.io/4511205459427328",
    tracesSampleRate: 0,
  }),
  sentryHandle(),
  noTransformHandle,
);

export const handleError = handleErrorWithSentry();
