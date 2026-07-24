"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type Lang } from "@/lib/i18n";

type TranslationsValue = typeof translations.en | typeof translations.bn;

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TranslationsValue;
};

const LangContext = createContext<LangContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    if (lang === "bn") {
      document.documentElement.lang = "bn";
      document.body.classList.add("lang-bn");
    } else {
      document.documentElement.lang = "en";
      document.body.classList.remove("lang-bn");
    }
  }, [lang]);

  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
