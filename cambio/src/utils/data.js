export const EMPTY_FILTERS = { from: "", to: "", min: "", max: "" };
export function todayISO(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
export function periodRange(period, end = todayISO()) {
  if (!/^(7d|15d|30d|3m|6m|1y|5y|10y)$/.test(period))
    throw new Error("Período inválido.");
  const date = new Date(end + "T12:00:00Z");
  if (!Number.isFinite(date.getTime())) throw new Error("Data inválida.");
  const n = parseInt(period, 10);
  if (period.endsWith("d")) date.setUTCDate(date.getUTCDate() - n + 1);
  else {
    const day = date.getUTCDate();
    date.setUTCDate(1);
    date.setUTCMonth(date.getUTCMonth() - (period.endsWith("y") ? n * 12 : n));
    const last = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0),
    ).getUTCDate();
    date.setUTCDate(Math.min(day, last));
  }
  return { from: date.toISOString().slice(0, 10), to: end };
}
export function parseAmount(raw) {
  const text = String(raw).trim();
  if (!/^\d+(?:[.,]\d{1,8})?$/.test(text)) return null;
  const n = Number(text.replace(",", "."));
  return Number.isFinite(n) && n >= 0 && n <= 1e12 ? n : null;
}
export function convert(amount, rate) {
  if (
    !Number.isFinite(amount) ||
    amount < 0 ||
    !Number.isFinite(rate) ||
    rate <= 0
  )
    throw new Error("Valor ou taxa inválida.");
  return amount * rate;
}
export function validateFilters(f) {
  if (f.from && f.to && f.from > f.to)
    return "A data inicial deve ser anterior ou igual à final.";
  if (
    (f.min !== "" && (!Number.isFinite(Number(f.min)) || Number(f.min) < 0)) ||
    (f.max !== "" && (!Number.isFinite(Number(f.max)) || Number(f.max) < 0))
  )
    return "Informe cotações válidas e não negativas.";
  if (f.min !== "" && f.max !== "" && Number(f.min) > Number(f.max))
    return "A cotação mínima deve ser menor ou igual à máxima.";
  return "";
}
export function filterAndSort(
  rows,
  f = EMPTY_FILTERS,
  sort = { key: "date", direction: "desc" },
) {
  if (validateFilters(f)) return [];
  return rows
    .filter(
      (r) =>
        (!f.from || r.date >= f.from) &&
        (!f.to || r.date <= f.to) &&
        (f.min === "" || r.rate >= Number(f.min)) &&
        (f.max === "" || r.rate <= Number(f.max)),
    )
    .sort((a, b) => {
      const comparison =
        sort.key === "rate" ? a.rate - b.rate : a.date.localeCompare(b.date);
      return (
        comparison * (sort.direction === "asc" ? 1 : -1) ||
        a.date.localeCompare(b.date)
      );
    });
}
export function toCsv(rows) {
  if (!rows.length) throw new Error("Não há registros para exportar.");
  const cell = (v) => '"' + String(v).replaceAll('"', '""') + '"';
  return (
    "\uFEFF" +
    [
      ["Data", "Origem", "Destino", "Cotação"],
      ...rows.map((r) => [
        r.date,
        r.base,
        r.quote,
        String(r.rate).replace(".", ","),
      ]),
    ]
      .map((row) => row.map(cell).join(";"))
      .join("\r\n")
  );
}
export function csvFilename(rows) {
  if (!rows.length) throw new Error("Não há registros para exportar.");
  const dates = rows.map((r) => r.date).sort();
  return `hermes_${rows[0].base}_${rows[0].quote}_${dates[0]}_${dates.at(-1)}.csv`;
}
export function downloadCsv(rows) {
  const url = URL.createObjectURL(
    new Blob([toCsv(rows)], { type: "text/csv;charset=utf-8;" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = csvFilename(rows);
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export const number = (n, digits = 4) =>
  new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);
export const dateLabel = (date, short = false) =>
  new Intl.DateTimeFormat(
    "pt-BR",
    short
      ? { day: "2-digit", month: "short", timeZone: "UTC" }
      : { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" },
  ).format(new Date(date + "T12:00:00Z"));
export const money = (n, currency) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(n);
const names = new Intl.DisplayNames(["pt-BR"], { type: "currency" });
export const currencyName = (code) => names.of(code) || code;
