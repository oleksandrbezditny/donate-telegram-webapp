import { FC } from 'react';
import { Popup } from '../Popup';
import { useIntl } from 'react-intl';
import styles from './CancelSalePopup.module.scss';

export type CancelSellPopupProps = Readonly<{
  onSuccess: () => void;
  onReject: () => void;
}>;

export const CancelSalePopup: FC<CancelSellPopupProps> = ({ onSuccess, onReject }) => {
  const intl = useIntl();
  const popupTitle = intl.formatMessage({ id: 'cancel' });
  const transactionFeeText = intl.formatMessage({ id: 'transactionFee' });

  return (
    <Popup
      title={popupTitle}
      titleSize="big"
      withProceedButton={true}
      proceedButtonDisabled={false}
      withCancelButton={true}
      proceedButtonTitle={popupTitle}
      onSuccess={onSuccess}
      onReject={onReject}
    >
      <div className={styles.description}>
        <div className={styles.item}>
          <p>{transactionFeeText}</p> 10
        </div>
      </div>
    </Popup>
  );
};
