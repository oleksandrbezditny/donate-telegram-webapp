import { FC, ReactNode, createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { IntlProvider } from 'react-intl';
import { Language, LanguageCode, LanguageContextProps } from './types.ts';
import messages from './translations.json';

const LocalStorageKey = 'language';
const defaultLanguageCode: LanguageCode = 'en';

const LanguageContext = createContext<LanguageContextProps | null>(null);

const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedLanguage = localStorage.getItem(LocalStorageKey);
    if (storedLanguage) {
      const parsedLanguage = JSON.parse(storedLanguage);
      setLanguage({ ...parsedLanguage, locale: parsedLanguage.code });
    } else {
      setLanguage({ code: defaultLanguageCode, locale: defaultLanguageCode, data: messages.en });
    }
    setIsLoading(false);
  }, []);

  const selectLanguage = useCallback((code: LanguageCode) => {
    const languageData = messages[code];

    if (languageData) {
      setLanguage({ code, locale: code, data: languageData });
      localStorage.setItem(LocalStorageKey, JSON.stringify({ code, data: languageData }));
    }
  }, []);

  const value = useMemo(() => ({ language, selectLanguage }), [language, selectLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {isLoading ? (
        <div>Loading language...</div>
      ) : (
        <IntlProvider locale={language?.locale ?? defaultLanguageCode} messages={language?.data}>
          {children}
        </IntlProvider>
      )}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
