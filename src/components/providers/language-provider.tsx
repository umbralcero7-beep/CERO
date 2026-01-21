'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import es from '@/lib/locales/es.json';
import en from '@/lib/locales/en.json';

type Locale = 'es' | 'en';
type Translations = typeof es;

const translations: Record<Locale, Translations> = { es, en };

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof Translations, params?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es');

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') as Locale | null;
    if (storedLocale && ['es', 'en'].includes(storedLocale)) {
      setLocaleState(storedLocale);
    } else {
        // First time visit, check browser language
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'en') {
            setLocaleState('en');
        }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = useCallback((key: keyof Translations, params?: { [key: string]: string | number }): string => {
    let translation = translations[locale]?.[key] || key;
    if (params) {
        Object.keys(params).forEach(paramKey => {
            translation = translation.replace(`{${paramKey}}`, String(params[paramKey]));
        });
    }
    return translation;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
