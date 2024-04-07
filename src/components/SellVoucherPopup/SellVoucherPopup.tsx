import { FC, useCallback, useState } from 'react';
import { Popup } from '../Popup';
import { useIntl } from 'react-intl';
import { VoucherEntity } from '../Voucher';
import { NumberField } from '../NumberField';

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

  const [selectedPrice, setSelectedPrice] = useState(0);

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
        <NumberField
          value={selectedPrice}
          max={forVoucher.price}
          onChange={setSelectedPrice}
          title={numberFieldTitle}
          placeholder={numberFieldTitle}
        />
        <div>
          <p>{serviceFeeText}</p> - {(selectedPrice * 0.05).toFixed(2)}
        </div>
        <div>
          <p>{creatorRoyaltyText}</p> - {(selectedPrice * 0.95).toFixed(2)}
        </div>
        <div>
          <p>{youReceiveText}</p>
        </div>
      </div>
    </Popup>
  );
};
