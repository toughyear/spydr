import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const output = new URL("../vercel-dist/", import.meta.url);
const client = new URL("../dist/client/", import.meta.url);
const workerUrl = new URL(`../dist/server/index.js?export=${Date.now()}`, import.meta.url);
const { default: worker } = await import(workerUrl.href);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(client, output, { recursive: true });

const response = await worker.fetch(
  new Request("https://spydr-red-team.vercel.app/", {
    headers: {
      accept: "text/html",
      host: "spydr-red-team.vercel.app",
      "x-forwarded-host": "spydr-red-team.vercel.app",
      "x-forwarded-proto": "https",
    },
  }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) throw new Error(`Static export failed with HTTP ${response.status}`);
await writeFile(new URL("index.html", output), await response.text());
