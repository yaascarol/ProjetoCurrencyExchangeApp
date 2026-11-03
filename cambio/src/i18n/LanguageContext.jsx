import { createContext, useContext, useEffect, useState } from "react";
import { locales, translate } from "./messages.js";
import * as format from "../utils/data.js";

const LanguageContext = createContext(null);
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try { return Object.hasOwn(locales, localStorage.getItem("hermes-language")) ? localStorage.getItem("hermes-language") : "pt"; }
    catch { return "pt"; }
  });
  const locale = locales[language];
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `Hermes — ${translate(language, "Conversor de moedas")}`;
    try { localStorage.setItem("hermes-language", language); } catch { /* Storage may be disabled. */ }
  }, [language, locale]);
  const t = (key, values) => translate(language, key, values);
  const value = {
    language, setLanguage, locale, t,
    number: (value, digits) => format.number(value, digits, locale),
    dateLabel: (value, short) => format.dateLabel(value, short, locale),
    money: (value, currency) => format.money(value, currency, locale),
    currencyName: (code) => format.currencyName(code, locale),
  };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export function useLanguage() { return useContext(LanguageContext); }
