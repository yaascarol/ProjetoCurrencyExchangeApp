import { LoaderCircle, CircleAlert, SearchX } from "lucide-react";
import s from "./QueryState.module.css";
export default function QueryState({
  status,
  message,
  onRetry,
  compact = false,
}) {
  if (status === "success" || status === "idle") return null;
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
        {message ||
          (status === "loading"
            ? "Consultando cotações…"
            : status === "error"
              ? "Não foi possível carregar os dados."
              : "Nenhum registro encontrado.")}
      </strong>
      {status === "error" && onRetry && (
        <button onClick={onRetry}>Tentar novamente</button>
      )}
      {status === "empty" && <span>Altere o período ou limpe os filtros.</span>}
    </div>
  );
}
