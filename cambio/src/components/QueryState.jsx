import { useLanguage } from "../i18n/LanguageContext.jsx";
import { LoaderCircle, CircleAlert, SearchX } from "lucide-react";
import s from "./QueryState.module.css";
export default function QueryState({
  status,
  message,
  onRetry,
  compact = false,
}) {
  const { t } = useLanguage();
  if (status === "success" || status === "idle") return null;
  const httpStatus = message?.match(/HTTP (\d+)/)?.[1];
  const displayMessage = httpStatus ? t("httpError", { status: httpStatus }) : t(message || (status === "loading" ? "Consultando cotações…" : status === "error" ? "Não foi possível carregar os dados." : "Nenhum registro encontrado."));
  const Icon =
    status === "loading"
      ? LoaderCircle
      : status === "error"
        ? CircleAlert
        : SearchX;
  return (
    <div
      className={`${s.state} ${compact ? s.compact : ""}`}
      role={status === "error" ? "alert" : "status"}
    >
      <Icon size={24} className={status === "loading" ? s.spin : ""} />
      <strong>
        {displayMessage}
      </strong>
      {status === "error" && onRetry && (
        <button onClick={onRetry}>{t("Tentar novamente")}</button>
      )}
      {status === "empty" && <span>{t("Altere o período ou limpe os filtros.")}</span>}
    </div>
  );
}
