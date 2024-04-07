import { FC, useCallback } from 'react';
import { Popup } from '../Popup';
import { useIntl } from 'react-intl';
import { VoucherEntity } from '../Voucher';

export type SellVoucherPopupProps = Readonly<{
  onPopupSuccess: () => void;
  onPopupReject: () => void;
  forVoucher: VoucherEntity;
}>;

export const SellVoucherPopup: FC<SellVoucherPopupProps> = ({ onPopupSuccess, onPopupReject }) => {
  const intl = useIntl();
  const popupTitle = intl.formatMessage({ id: 'voucherPopupTitle' });
  const popupButtonTitle = intl.formatMessage({ id: 'voucherPopupButtonTitle' });

  const onPopupSuccessHandler = useCallback(() => {
    alert('success operation');
    onPopupSuccess();
  }, [onPopupSuccess]);

  const onPopupRejectHandler = useCallback(() => {
    onPopupReject();
  }, [onPopupReject]);

  return (
    <Popup
      title={popupTitle}
      buttonText={popupButtonTitle}
      onSuccess={onPopupSuccessHandler}
      onReject={onPopupRejectHandler}
    >
      <div>
        <div>service fee (5%) - 100</div>
        <div>creator royalty (100%)</div>
        <div>you receive (100%)</div>
      </div>
    </Popup>
  );
};
