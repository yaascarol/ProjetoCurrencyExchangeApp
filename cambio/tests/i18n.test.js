import test from "node:test";
import assert from "node:assert/strict";
import { messages, translate } from "../src/i18n/messages.js";
import { toCsv, number, dateLabel } from "../src/utils/data.js";
test("all interface messages have Portuguese, English and Spanish translations", () => {
  for (const [key, values] of Object.entries(messages)) {
    for (const locale of ["pt", "en", "es"]) assert.ok(values[locale]?.trim(), `${key}: ${locale}`);
    const placeholders = (text) => [...text.matchAll(/\{\w+\}/g)].map((m) => m[0]).sort();
    assert.deepEqual(placeholders(values.en), placeholders(values.pt));
    assert.deepEqual(placeholders(values.es), placeholders(values.pt));
  }
  assert.equal(translate("en", "pagination", { from: 1, to: 10, total: 20 }), "Showing 1–10 of 20");
});
test("locale changes formatting and CSV headers without changing currency codes or ISO dates", () => {
  const rows = [{ date: "2024-05-01", base: "EUR", quote: "USD", rate: 1.2345 }];
  assert.ok(toCsv(rows, "en").includes('"Date";"Source";"Target";"Rate"'));
  assert.ok(toCsv(rows, "en").includes('"2024-05-01";"EUR";"USD";"1.2345"'));
  assert.ok(toCsv(rows, "es").includes('"Fecha";"Origen";"Destino";"Cotización"'));
  assert.ok(toCsv(rows, "es").includes('"1,2345"'));
  assert.equal(number(1234.5, 2, "en-US"), "1,234.50");
  assert.equal(number(1234.5, 2, "pt-BR"), "1.234,50");
  assert.equal(dateLabel("2024-05-01", false, "en-US"), "05/01/2024");
  assert.equal(dateLabel("2024-05-01", false, "es-ES"), "01/05/2024");
});
