import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("https://spydr.test/", {
      headers: {
        accept: "text/html",
        host: "spydr.test",
        "x-forwarded-host": "spydr.test",
        "x-forwarded-proto": "https",
      },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the SPYDR hackathon story", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();

  assert.match(html, /<title>SPYDR — Autonomous Red Team<\/title>/i);
  assert.match(html, /Find the path/);
  assert.match(html, /used Runloop to/);
  assert.match(html, /red-team Runloop/);
  assert.match(html, /No maybes dressed as findings/);
  assert.match(html, /Sanitized for responsible disclosure/);
  assert.match(html, /https:\/\/spydr\.test\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/);
});
