import { useEffect, useState } from "react";
import { getCurrencies, getRate, getHistory } from "../services/frankfurter.js";
const cache = new Map();
export default function useFrankfurter(kind, params = [], enabled = true) {
  const key = JSON.stringify([kind, ...params]);
  const [state, setState] = useState({
    key: "",
    status: "loading",
    data: null,
    error: "",
  });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    let active = true,
      timedOut = false;
    const cached = cache.get(key);
    if (cached && Date.now() - cached.time < 300000) {
      setState({ ...cached.state, key });
      return;
    }
    setState({ key, status: "loading", data: null, error: "" });
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 30000);
    async function load() {
      try {
        const [type, ...args] = JSON.parse(key);
        const data = await {
          currencies: getCurrencies,
          rate: getRate,
          history: getHistory,
        }[type](...args, controller.signal);
        const next = {
          key,
          status: Array.isArray(data) && !data.length ? "empty" : "success",
          data,
          error: "",
        };
        if (active) {
          cache.set(key, { time: Date.now(), state: next });
          setState(next);
        }
      } catch (e) {
        if (active && (e.name !== "AbortError" || timedOut))
          setState({
            key,
            status: "error",
            data: null,
            error: timedOut
              ? "A consulta demorou mais de 30 segundos. Tente novamente."
              : e instanceof TypeError
                ? "Falha de conexão. Verifique sua internet e tente novamente."
                : e.message,
          });
      } finally {
        clearTimeout(timeout);
      }
    }
    load();
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [key, enabled, attempt]);
  const retry = () => {
    cache.delete(key);
    setAttempt((n) => n + 1);
  };
  if (!enabled) return { status: "idle", data: null, error: "", retry };
  return {
    ...(state.key === key
      ? state
      : { status: "loading", data: null, error: "" }),
    retry,
  };
}
