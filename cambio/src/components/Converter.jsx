import { ArrowRightLeft, ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import {
  parseAmount,
  convert,
  number,
  money,
  dateLabel,
  currencyName,
} from "../utils/data.js";
import QueryState from "./QueryState.jsx";
import s from "./Converter.module.css";
export function CurrencySelect({
  label,
  value,
  onChange,
  currencies,
  disabled,
}) {
  return (
    <label className={s.selectLabel}>
      <span>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-label={label}
      >
        {currencies.map((c) => (
          <option key={c.iso_code} value={c.iso_code}>
            {c.iso_code} — {currencyName(c.iso_code)}
          </option>
        ))}
      </select>
    </label>
  );
}
export default function Converter({ pair, onPairChange, currencies, query }) {
  const [input, setInput] = useState("1000");
  const amount = parseAmount(input),
    valid = amount !== null;
  const same = pair.base === pair.quote;
  const success = query.status === "success" && query.data;
  return (
    <section className={s.panel} aria-labelledby="converter-title">
      <div className={s.top}>
        <h2 id="converter-title">
          <span>01</span> Conversor de moedas
        </h2>
        <span className={s.tag}>
          <span /> Taxas de referência
        </span>
      </div>
      <div className={s.fields}>
        <div className={s.field}>
          <CurrencySelect
            label="Moeda de origem"
            value={pair.base}
            onChange={(base) => onPairChange({ ...pair, base })}
            currencies={currencies}
            disabled={!currencies.length}
          />
          <label className={s.amountLabel} htmlFor="amount">
            Você envia
          </label>
          <div className={s.value}>
            <input
              id="amount"
              inputMode="decimal"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-invalid={!valid}
              aria-describedby={!valid ? "amount-error" : undefined}
            />
            <span>{pair.base}</span>
          </div>
        </div>
        <button
          className={s.swap}
          aria-label="Inverter moedas"
          title="Inverter moedas"
          onClick={() => onPairChange({ base: pair.quote, quote: pair.base })}
        >
          <ArrowRightLeft size={20} />
        </button>
        <div className={`${s.field} ${s.result}`}>
          <CurrencySelect
            label="Moeda de destino"
            value={pair.quote}
            onChange={(quote) => onPairChange({ ...pair, quote })}
            currencies={currencies}
            disabled={!currencies.length}
          />
          <span className={s.amountLabel}>Você recebe</span>
          <div className={s.value} aria-live="polite">
            <output>
              {success && valid
                ? money(convert(amount, query.data.rate), pair.quote)
                : "—"}
            </output>
          </div>
        </div>
      </div>
      {!valid && (
        <p id="amount-error" className={s.error} role="alert">
          Informe um valor entre 0 e 1 trilhão, sem separador de milhar. Ex.:
          1000,50.
        </p>
      )}
      {same ? (
        <p className={s.error} role="alert">
          Selecione duas moedas diferentes para converter e analisar.
        </p>
      ) : query.status !== "success" ? (
        <QueryState
          status={query.status}
          message={query.error}
          onRetry={query.retry}
          compact
        />
      ) : (
        <div className={s.bottom}>
          <p>
            <ArrowUpRight size={16} />
            <strong>
              1 {pair.base} = {number(query.data.rate, 6)} {pair.quote}
            </strong>
            <span className={s.divider}>/</span>
            <span>Cotação de {dateLabel(query.data.date)}</span>
          </p>
          <span>
            <Check size={14} /> Conversão automática
          </span>
        </div>
      )}
      <p className={s.note}>
        Cotações de referência diárias. O valor não inclui impostos, tarifas ou
        spread.
      </p>
    </section>
  );
}
