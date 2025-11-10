import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import en from "@/data/i18n/en.json";
import th from "@/data/i18n/th.json";

export type Lang = "en" | "th";

export type Dict = Record<string, string>;

type I18nValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
  clearLang: () => void;
  t: (key: string) => string;
};

const dictionaries: Record<Lang, Dict> = { en, th };

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>("en");

  const dict = useMemo(() => dictionaries[lang], [lang]);

  useEffect(() => {
    let initial: Lang = "en";
    const q = router.query?.lang;
    const fromQuery = Array.isArray(q) ? q[0] : q;
    if (fromQuery === "th" || fromQuery === "en") {
      initial = fromQuery;
    } else if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("lang");
      if (stored === "th" || stored === "en") initial = stored as Lang;
    }
    setLangState(initial);
    if (fromQuery !== initial) {
      const query = { ...router.query, lang: initial };
      router.replace({ pathname: router.pathname, query }, undefined, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLang = useCallback(
    (next: Lang) => {
      setLangState(next);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("lang", next);
      }
      const query = { ...router.query, lang: next };
      router.replace({ pathname: router.pathname, query }, undefined, { shallow: true });
    },
    [router]
  );

  const clearLang = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("lang");
    }
    const next: Lang = "en"; // fallback to default language
    setLangState(next);
    const query = { ...router.query, lang: next };
    router.replace({ pathname: router.pathname, query }, undefined, { shallow: true });
  }, [router]);

  const t = useCallback((key: string) => dict[key] ?? key, [dict]);

  const value = useMemo(() => ({ lang, setLang, clearLang, t }), [lang, setLang, clearLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}