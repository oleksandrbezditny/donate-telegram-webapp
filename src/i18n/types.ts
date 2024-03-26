export type LanguageCode = 'en' | 'ru';

export type Language = Readonly<{
  code: string;
  locale: string;
  data: { [key: string]: string };
}>;

export type LanguageContextProps = Readonly<{
  language: Language | null;
  selectLanguage: (code: LanguageCode) => void;
}>;
