import { useLanguage } from "./i18n/LanguageContext.jsx";
import { useState } from "react";
import { ArrowUpRight, Info, ArrowRightLeft } from "lucide-react";
import Converter from "./components/Converter.jsx";
import History from "./components/History.jsx";
import HistoryData from "./components/HistoryData.jsx";
import QueryState from "./components/QueryState.jsx";
import useFrankfurter from "./hooks/useFrankfurter.js";
import { periodRange } from "./utils/data.js";
import s from "./App.module.css";
export default function App() {
  const { t, language, setLanguage } = useLanguage();

  const [pair, setPair] = useState({ base: "USD", quote: "BRL" }),
    [period, setPeriod] = useState("30d");
  const range = periodRange(period),
    different = pair.base !== pair.quote;
  const currencies = useFrankfurter("currencies");
  const rate = useFrankfurter("rate", [pair.base, pair.quote], different);
  const history = useFrankfurter(
    "history",
    [pair.base, pair.quote, range.from, range.to],
    different,
  );
  return (
    <>
      <a className={s.skip} href="#main">{t("Pular para conteúdo")}</a>
      <header className={s.header}>
        <a className={s.brand} href="#main" aria-label={t("Currency Exchange App início")}>
          <ArrowRightLeft size={24} aria-hidden="true" />
          Currency Exchange App
        </a>
        <nav className={s.nav} aria-label={t("Seções")}>
          <a href="#converter-title">{t("Conversor")}</a>
          <a href="#history-title">{t("Histórico")}</a>
          <a href="#data-title">{t("Cotações")}</a>
        </nav>
        <div className={s.languages} role="group" aria-label={t("Idioma")}>
          {[["pt", "PT", "Português"], ["en", "EN", "English"], ["es", "ES", "Español"]].map(([code, label, name]) => (
            <button key={code} type="button" lang={code} aria-label={name} aria-pressed={language === code} onClick={() => setLanguage(code)}>{label}</button>
          ))}
        </div>
      </header>
      <main id="main" className={s.main}>
        <div className={s.intro}>
          <h1>{t("Conversor de moedas")}</h1>
          <p>{t("Consulte o câmbio, compare datas e baixe as cotações.")}</p>
        </div>
        {currencies.status !== "success" && (
          <div className={s.globalState}>
            <QueryState
              status={currencies.status}
              message={currencies.error || undefined}
              onRetry={currencies.retry}
              compact
            />
          </div>
        )}
        <div className={s.sections}>
          <Converter
            pair={pair}
            onPairChange={setPair}
            currencies={currencies.data || []}
            query={rate}
          />
          {different ? (
            <>
              <History
                pair={pair}
                period={period}
                onPeriodChange={setPeriod}
                query={history}
              />
              <HistoryData
                key={`${pair.base}-${pair.quote}-${period}`}
                query={history}
              />
            </>
          ) : (
            <section className={s.same}>{t("Escolha moedas diferentes para consultar o histórico.")}</section>
          )}
        </div>
        <aside className={s.info}>
          <Info size={18} aria-hidden="true" />
          <div>
            <strong>{t("Sobre as cotações")}</strong>
            <p>{t("As taxas são atualizadas diariamente pelas fontes oficiais reunidas pela Frankfurter. A data exibida é a da cotação, não a do acesso.")}</p>
          </div>
        </aside>
      </main>
      <footer className={s.footer}>
        <span>
          Currency Exchange App <small>© {new Date().getFullYear()}</small>
        </span>
        <p>{t("Projeto educacional · React & Frankfurter")}</p>
        <a href="https://frankfurter.dev/" target="_blank" rel="noreferrer">{t("Sobre os dados")}<ArrowUpRight size={13} />
        </a>
      </footer>
    </>
  );
}
