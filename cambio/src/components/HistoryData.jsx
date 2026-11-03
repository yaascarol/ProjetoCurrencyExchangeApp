import { useLanguage } from "../i18n/LanguageContext.jsx";
import { useState } from "react";
import {
  Download,
  ArrowDownUp,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import {
  EMPTY_FILTERS,
  filterAndSort,
  validateFilters,
  downloadCsv,
} from "../utils/data.js";
import QueryState from "./QueryState.jsx";
import s from "./HistoryData.module.css";
export default function HistoryData({ query }) {
  const { t, language, number, dateLabel } = useLanguage();

  const [filters, setFilters] = useState({ ...EMPTY_FILTERS }),
    [sort, setSort] = useState({ key: "date", direction: "desc" }),
    [page, setPage] = useState(1),
    [notice, setNotice] = useState("");
  const error = validateFilters(filters),
    rows = filterAndSort(query.data || [], filters, sort),
    pages = Math.max(1, Math.ceil(rows.length / 10)),
    current = Math.min(page, pages),
    visible = rows.slice((current - 1) * 10, current * 10);
  const change = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setPage(1);
    setNotice("");
  };
  const clear = () => {
    setFilters({ ...EMPTY_FILTERS });
    setPage(1);
    setNotice("");
  };
  const order = (key) => {
    setSort({
      key,
      direction: sort.key === key && sort.direction === "asc" ? "desc" : "asc",
    });
    setPage(1);
  };
  return (
    <section className={s.panel} aria-labelledby="data-title">
      <div className={s.heading}>
        <div>
          <h2 id="data-title">{t("Tabela de cotações")}</h2>
          <p>{t("Filtre os registros por data ou valor e exporte em CSV.")}</p>
        </div>
        <button
          className={s.export}
          disabled={!rows.length || !!error || query.status !== "success"}
          onClick={() => {
            try {
              downloadCsv(rows, language);
              setNotice({ count: rows.length });
            } catch (e) {
              setNotice({ error: true });
            }
          }}
        >
          <Download size={15} />{t("Exportar CSV")}</button>
      </div>
      <div className={s.filters}>
        <span className={s.filterIcon}>
          <SlidersHorizontal size={17} />
        </span>
        <label>{t("Data inicial")}<input
            type="date"
            aria-label={t("Data inicial")}
            value={filters.from}
            onInput={(e) => change("from", e.currentTarget.value)}
            onChange={(e) => change("from", e.target.value)}
          />
        </label>
        <label>{t("Data final")}<input
            type="date"
            aria-label={t("Data final")}
            value={filters.to}
            onInput={(e) => change("to", e.currentTarget.value)}
            onChange={(e) => change("to", e.target.value)}
          />
        </label>
        <label>{t("Cotação mínima")}<input
            type="number"
            min="0"
            step="any"
            placeholder={t("Sem mínimo")}
            value={filters.min}
            onChange={(e) => change("min", e.target.value)}
          />
        </label>
        <label>{t("Cotação máxima")}<input
            type="number"
            min="0"
            step="any"
            placeholder={t("Sem máximo")}
            value={filters.max}
            onChange={(e) => change("max", e.target.value)}
          />
        </label>
        <button onClick={clear} className={s.clear}>
          <RotateCcw size={13} />{t("Limpar")}</button>
      </div>
      {error && (
        <p role="alert" className={s.error}>
          {t(error)}
        </p>
      )}
      <div className={s.count}>
        <span>
          <strong>{rows.length}</strong>{" "}{t("registros encontrados")}</span>
        <span>{t("Filtros aplicados à tabela e ao CSV")}</span>
      </div>
      {query.status !== "success" ? (
        <QueryState
          status={query.status}
          message={query.error}
          onRetry={query.retry}
        />
      ) : !rows.length ? (
        <QueryState status="empty" />
      ) : (
        <>
          <div className={s.scroll}>
            <table>
              <thead>
                <tr>
                  <th
                    aria-sort={
                      sort.key === "date"
                        ? sort.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <button onClick={() => order("date")}>{t("Data")}<ArrowDownUp size={12} />
                      {sort.key === "date"
                        ? sort.direction === "asc"
                          ? " ↑"
                          : " ↓"
                        : ""}
                    </button>
                  </th>
                  <th>{t("Origem")}</th>
                  <th>{t("Destino")}</th>
                  <th
                    className={s.numeric}
                    aria-sort={
                      sort.key === "rate"
                        ? sort.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <button onClick={() => order("rate")}>{t("Cotação")}<ArrowDownUp size={12} />
                      {sort.key === "rate"
                        ? sort.direction === "asc"
                          ? " ↑"
                          : " ↓"
                        : ""}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => (
                  <tr key={`${r.date}-${r.base}-${r.quote}`}>
                    <td>{dateLabel(r.date)}</td>
                    <td>
                      <span className={s.code}>{r.base}</span>
                    </td>
                    <td>
                      <span className={s.code}>{r.quote}</span>
                    </td>
                    <td className={s.numeric}>{number(r.rate, 6)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={s.pagination}>
            <span>
              {t("pagination", { from: (current - 1) * 10 + 1, to: Math.min(current * 10, rows.length), total: rows.length })}
            </span>
            <div>
              <button
                disabled={current === 1}
                aria-label={t("Página anterior")}
                onClick={() => setPage(current - 1)}
              >
                <ChevronLeft size={15} />
              </button>
              <span>
                {current} / {pages}
              </span>
              <button
                disabled={current === pages}
                aria-label={t("Próxima página")}
                onClick={() => setPage(current + 1)}
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </>
      )}
      {notice && (
        <p className={s.notice} role="status">
          {notice.error ? t("Falha ao exportar CSV.") : t("exported", notice)}
        </p>
      )}
    </section>
  );
}
