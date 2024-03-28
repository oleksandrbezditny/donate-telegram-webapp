import { LanguageProvider } from './i18n';
import { LanguageSelector, Voucher } from './components';
import { FormattedMessage } from 'react-intl';
import './App.scss';
import { Popup } from './components/Popup';

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

        <div style={{ width: '500px', height: '400px' }}>
          <Popup>
            <div>Some content</div>
          </Popup>
        </div>
      </LanguageProvider>
    </>
  );
}

export default App;
