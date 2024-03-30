import { LanguageProvider } from './i18n';
import { LanguageSelector } from './components';
import { Popup } from './components/Popup';
import { useCallback, useState } from 'react';
import { VoucherList } from './components/VoucherList';
import styles from './App.module.scss';

function App() {
  const [popupOpened, setPopupOpened] = useState(false);

  const onPopupSuccess = useCallback(() => {
    alert('success operation');
    setPopupOpened(false);
  }, []);

  const onPopupReject = useCallback(() => {
    setPopupOpened(false);
  }, []);

  const onVoucherSelect = useCallback((): void => {
    setPopupOpened(true);
  }, []);

  return (
    <>
      <LanguageProvider>
        <div className={styles.appRoot}>
          <div>
            <LanguageSelector />
          </div>
          <VoucherList onVoucherSelect={onVoucherSelect} />

          {popupOpened ? (
            <div style={{ width: '500px', height: '400px' }}>
              <Popup
                title="Some title example"
                buttonText="Apply"
                onSuccess={onPopupSuccess}
                onReject={onPopupReject}
              >
                <div>Some content</div>
              </Popup>
            </div>
          ) : null}
        </div>
      </LanguageProvider>
    </>
  );
}

export default App;
