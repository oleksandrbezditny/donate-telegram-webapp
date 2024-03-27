import './App.css';
import { LanguageProvider } from './i18n';
import { LanguageSelector, Voucher } from './components';
import { FormattedMessage } from 'react-intl';
import './App.scss';

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
        <div style={{ width: '300px', height: '400px' }}>
          <Voucher />
        </div>
      </LanguageProvider>
    </>
  );
}

export default App;
