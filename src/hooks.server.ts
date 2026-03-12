import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
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
