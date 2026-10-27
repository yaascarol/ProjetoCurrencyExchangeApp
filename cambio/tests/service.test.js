import test from "node:test";
import assert from "node:assert/strict";
import {
  getRate,
  getHistory,
  getCurrencies,
} from "../src/services/frankfurter.js";
test("service validates HTTP errors and malformed payloads", async (t) => {
  t.mock.method(
    globalThis,
    "fetch",
    async () => new Response("{}", { status: 503 }),
  );
  await assert.rejects(getRate("USD", "BRL"), /HTTP 503/);
  globalThis.fetch = async () => new Response(JSON.stringify({ rate: "5" }));
  await assert.rejects(getRate("USD", "BRL"), /inválida/);
  globalThis.fetch = async () => new Response(JSON.stringify({ wrong: true }));
  await assert.rejects(getCurrencies(), /inválida/);
});
test("history preserves empty data and excludes observations outside range", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response("[]"));
  assert.deepEqual(
    await getHistory("USD", "BRL", "2024-01-01", "2024-01-02"),
    [],
  );
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify([
        { date: "2023-12-29", base: "USD", quote: "BRL", rate: 5 },
        { date: "2024-01-02", base: "USD", quote: "BRL", rate: 5.1 },
      ]),
    );
  assert.equal(
    (await getHistory("USD", "BRL", "2024-01-01", "2024-01-02")).length,
    1,
  );
});
test("network failures and aborted requests propagate", async (t) => {
  t.mock.method(globalThis, "fetch", async () => {
    throw new TypeError("Network error");
  });
  await assert.rejects(getRate("USD", "BRL"), /Network/);
  const c = new AbortController();
  c.abort();
  globalThis.fetch = async (_url, { signal }) => {
    signal.throwIfAborted();
  };
  await assert.rejects(getRate("USD", "BRL", c.signal), { name: "AbortError" });
});
