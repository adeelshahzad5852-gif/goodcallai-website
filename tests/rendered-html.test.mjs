import assert from "node:assert/strict";
import test from "node:test";

const bookingUrl =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3qZrBQ6S-W782JUygtFJiwdV_SInvA6hmJd0nJ0hTcNmm8LUTF-afjVY8-STyi_hiJ7_RGQVJf";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the finished GoodcallAI homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>GoodcallAI \| Every missed call could be your next booked job<\/title>/i);
  assert.match(html, /Every missed call could be your next/);
  assert.match(html, /In-home estimate booked/);
  assert.match(html, /Enter your details once/);
  assert.match(html, new RegExp(bookingUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|codex-preview/i);
  assert.doesNotMatch(html, /<form|name="business"|name="trade"/i);
});

test("renders every intended route with its own content", async () => {
  const routes = [
    ["/hvac", /AI Receptionist for HVAC Teams \| GoodcallAI/, /Your technicians fix systems/, /When systems fail, calls come fast/],
    ["/plumbers", /AI Receptionist for Plumbing Teams \| GoodcallAI/, /Your plumbers stop the leak/, /Leaks do not wait for a callback/],
    ["/electricians", /AI Receptionist for Electrical Teams \| GoodcallAI/, /Keep your electricians on the job/, /Safety-related calls need a clear response/],
    ["/ai-receptionist", /Managed AI Receptionist \| GoodcallAI/, /A better answer for every incoming call/],
    ["/websites", /Websites for Home-Service Teams \| GoodcallAI/, /Your website should make it easy to choose you/],
    ["/how-it-works", /How GoodcallAI Works/, /Turn your business details into a custom AI call demo/],
    ["/contact", /Contact GoodcallAI \| Book a Free Demo/, /hello@goodcallai\.org/],
    ["/privacy", /Privacy Policy \| GoodcallAI/, /GoodcallAI is operated by Adeel Shahzad/, /Discovery calls are not recorded by default/],
    ["/terms", /Terms of Use \| GoodcallAI/, /These terms are governed by the laws of Pakistan/],
  ];

  for (const [path, title, content, supportingCopy] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, title, `${path} title`);
    assert.match(html, content, `${path} content`);
    if (supportingCopy) assert.match(html, supportingCopy, `${path} supporting copy`);
  }
});

test("returns a real 404 page for unknown routes", async () => {
  const response = await render("/this-page-does-not-exist");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /Page Not Found \| GoodcallAI/);
  assert.match(html, /That page isn’t here/);
});
