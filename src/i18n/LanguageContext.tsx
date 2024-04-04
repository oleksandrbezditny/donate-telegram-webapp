import { FC, ReactNode, createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { IntlProvider } from 'react-intl';
import { Language, LanguageCode, LanguageContextProps } from './types.ts';
import messages from './translations.json';
import { Locales, useTonConnectUI } from '@tonconnect/ui-react';

const LocalStorageKey = 'language';
const defaultLanguageCode: LanguageCode = 'en';

const LanguageContext = createContext<LanguageContextProps | null>(null);

const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [_, setOptions] = useTonConnectUI();

  const updateLanguage = useCallback(
    (language: Language) => {
      setLanguage(language);

      setOptions({
        language: language.code as Locales,
      });
    },
    [setOptions, setLanguage]
  );

  useEffect(() => {
    const storedLanguage = localStorage.getItem(LocalStorageKey);
    if (storedLanguage) {
      const parsedLanguage = JSON.parse(storedLanguage);
      updateLanguage({ ...parsedLanguage, locale: parsedLanguage.code });
    } else {
      updateLanguage({ code: defaultLanguageCode, locale: defaultLanguageCode, data: messages.en });
    }
    setIsLoading(false);
  }, [updateLanguage]);

  const selectLanguage = useCallback(
    (code: LanguageCode) => {
      const languageData = messages[code];

      if (languageData) {
        updateLanguage({ code, locale: code, data: languageData });
        localStorage.setItem(LocalStorageKey, JSON.stringify({ code, data: languageData }));
      }
    },
    [updateLanguage]
  );

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
