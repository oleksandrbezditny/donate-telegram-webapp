import { FC, useCallback, useState } from 'react';
import { VoucherList } from '../VoucherList';
import styles from './AvailableVouchersList.module.scss';
import { Popup } from '../Popup';
import { useIntl } from 'react-intl';

export type AvailableVouchersListProps = Readonly<{}>;

export const AvailableVouchersList: FC<AvailableVouchersListProps> = () => {
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
    <>
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
    </>
  );
};
