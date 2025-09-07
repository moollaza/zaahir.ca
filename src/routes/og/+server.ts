import { ImageResponse } from "@vercel/og";
import { error } from "@sveltejs/kit";
import { html } from "satori-html";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  try {
    const title = url.searchParams.get("title") ?? "Zaahir Moolla";
    const description = url.searchParams.get("description") ?? "Frontend developer at DuckDuckGo";

    const markup = html`
      <div
        style="
        background: linear-gradient(45deg, #1e293b 0%, #334155 100%);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: system-ui, sans-serif;
      "
      >
        <div
          style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px;
          text-align: center;
          max-width: 1000px;
        "
        >
          <h1
            style="
            font-size: 64px;
            font-weight: bold;
            color: #f1f5f9;
            margin-bottom: 30px;
            line-height: 1.1;
            margin-top: 0;
          "
          >
            ${title}
          </h1>
          <p
            style="
            font-size: 32px;
            color: #cbd5e1;
            margin-bottom: 40px;
            line-height: 1.3;
            max-width: 800px;
            margin-top: 0;
          "
          >
            ${description}
          </p>
          <div
            style="
            display: flex;
            align-items: center;
            font-size: 24px;
            color: #f97316;
            font-weight: 600;
          "
          >
            zaahir.ca
          </div>
        </div>
      </div>
    `;

    return new ImageResponse(markup, {
      width: 1200,
      height: 630,
    });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
    console.log(errorMessage);
    throw error(500, `Failed to generate the image: ${errorMessage}`);
  }
};
