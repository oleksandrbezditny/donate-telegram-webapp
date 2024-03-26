import './App.css';
import { LanguageProvider } from './i18n';
import { LanguageSelector } from './components';
import { FormattedMessage } from 'react-intl';

function App() {
  return (
    <>
      <LanguageProvider>
        <div>
          <LanguageSelector />
          <h1>
            <FormattedMessage id="greeting" />
          </h1>
        </div>
      </LanguageProvider>
    </>
  );
}

export default App;
