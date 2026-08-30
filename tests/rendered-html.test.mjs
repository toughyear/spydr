import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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

test("renders the SPYDR tap-through deck", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();

  assert.match(html, /<title>SPYDR — Autonomous Red Team<\/title>/i);
  assert.match(html, /SPYDR \/ CODEX COMMUNITY HACKATHON/);
  assert.match(html, /used Runloop/);
  assert.match(html, /red-team Runloop/);
  assert.match(html, /1 CRITICAL/);
  assert.match(html, /4 HIGH/);
  assert.match(html, /aria-label="Next slide"/);
  assert.match(html, /https:\/\/spydr\.test\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/);
});

test("keeps recon and finding evidence in structured data", async () => {
  const [deck, recon, findings] = await Promise.all([
    readFile(new URL("../app/Deck.tsx", import.meta.url), "utf8"),
    readFile(new URL("../demo/recon.json", import.meta.url), "utf8").then(JSON.parse),
    readFile(new URL("../demo/findings.json", import.meta.url), "utf8").then(JSON.parse),
  ]);

  assert.equal(recon.names.length, 34);
  assert.ok(recon.names.includes("docs.runloop.ai"));
  assert.ok(recon.names.includes("reflex.runloop.ai"));
  assert.equal(findings.length, 5);
  assert.deepEqual(findings.map((finding) => finding.severity), ["CRITICAL", "HIGH", "HIGH", "HIGH", "HIGH"]);
  assert.match(deck, /ArrowRight/);
  assert.match(deck, /Every guess had to/);
  assert.match(deck, /Strong findings say/);
});
