import { LanguageSelector } from './components';
import { Popup } from './components/Popup';
import { useCallback, useState } from 'react';
import { VoucherList } from './components/VoucherList';
import styles from './App.module.scss';
import { useIntl } from 'react-intl';

function App() {
  const [popupOpened, setPopupOpened] = useState(false);
  const intl = useIntl();
  const popupTitle = intl.formatMessage({ id: 'voucherPopupTitle' });
  const popupButtonTitle = intl.formatMessage({ id: 'voucherPopupButtonTitle' });

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
    <div className={styles.appRoot}>
      <div>
        <LanguageSelector />
      </div>
      <VoucherList onVoucherSelect={onVoucherSelect} />

      {popupOpened ? (
        <div className={styles.popupContainer}>
          <Popup
            title={popupTitle}
            buttonText={popupButtonTitle}
            onSuccess={onPopupSuccess}
            onReject={onPopupReject}
          >
            <div>Some content</div>
          </Popup>
        </div>
      ) : null}
    </div>
  );
}

export default App;
