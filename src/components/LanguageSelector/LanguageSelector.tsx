import React, { useContext } from 'react';
import { LanguageContext } from '../../i18n';
import { LanguageCode } from '../../i18n';

export const LanguageSelector: React.FC = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    return null;
  }

  const { language, selectLanguage } = context;

  if (!language) {
    return null;
  }

  return (
    <select value={language.code} onChange={(e) => selectLanguage(e.target.value as LanguageCode)}>
      <option value="en">English</option>
      <option value="ru">Russian</option>
    </select>
  );
};