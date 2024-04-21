import { FC, useCallback, useState } from 'react';
import { Popup } from '../Popup';
import { useIntl } from 'react-intl';
import { NumberField } from '../NumberField';
import styles from './SellVoucherPopup.module.scss';
import { VoucherEntity } from '../../models';

export type SellVoucherPopupProps = Readonly<{
  onPopupSuccess: () => void;
  onPopupReject: () => void;
  forVoucher: VoucherEntity;
}>;

export const SellVoucherPopup: FC<SellVoucherPopupProps> = ({
  onPopupSuccess,
  onPopupReject,
  forVoucher,
}) => {
  const intl = useIntl();
  const popupTitle = intl.formatMessage({ id: 'voucherPopupTitle' });
  const popupButtonTitle = intl.formatMessage({ id: 'voucherPopupButtonTitle' });
  const numberFieldTitle = intl.formatMessage({ id: 'sellVoucherNumberField' });
  const serviceFeeText = intl.formatMessage({ id: 'serviceFee' });
  const creatorRoyaltyText = intl.formatMessage({ id: 'creatorRoyalty' });
  const youReceiveText = intl.formatMessage({ id: 'youReceive' });

  const [selectedPrice, setSelectedPrice] = useState<number | undefined>(undefined);

  const onPopupSuccessHandler = useCallback(() => {
    onPopupSuccess();
  }, [onPopupSuccess]);

  const onPopupRejectHandler = useCallback(() => {
    onPopupReject();
  }, [onPopupReject]);

  return (
    <Popup
      title={popupTitle}
      titleSize="big"
      withProceedButton={true}
      proceedButtonTitle={popupButtonTitle}
      proceedButtonDisabled={true}
      onSuccess={onPopupSuccessHandler}
      onReject={onPopupRejectHandler}
      withCancelButton={true}
    >
      <div className={styles.container}>
        <div className={`${styles.item} ${styles.input}`}>
          <NumberField
            value={selectedPrice}
            max={forVoucher.price}
            onChange={setSelectedPrice}
            placeholder={numberFieldTitle}
          />
        </div>

        <div className={styles.details}>
          <div className={styles.item}>
            <p>{serviceFeeText}</p> {((selectedPrice ?? 0) * 0.05).toFixed(2)}
          </div>
          <div className={styles.item}>
            <p>{creatorRoyaltyText}</p> {((selectedPrice ?? 0) * 0.95).toFixed(2)}
          </div>
          <div className={styles.item}>
            <p>Transaction Fee (REST WILL BE RETURNED):</p> 10
          </div>
          <div className={styles.item}>
            <p>{youReceiveText}</p> Something in the future
          </div>
        </div>
      </div>
    </Popup>
  );
};
