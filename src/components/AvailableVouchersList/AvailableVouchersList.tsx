import { FC, useCallback, useState } from 'react';
import { VoucherList } from '../VoucherList';
import styles from './AvailableVouchersList.module.scss';
import { SellVoucherPopup } from '../SellVoucherPopup';
import { VoucherEntity } from '../../models';
import { Collection } from '../../models/collection.ts';

const vouchersMock: VoucherEntity[] = [
  {
    id: 1,
    price: 10000000,
  },
  {
    id: 2,
    price: 10000000,
  },
];

export type AvailableVouchersListProps = Readonly<{
  collection: Collection;
}>;

export const AvailableVouchersList: FC<AvailableVouchersListProps> = () => {
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherEntity | undefined>(undefined);

  const onPopupSuccess = useCallback(() => {
    alert('success operation');
    setSelectedVoucher(undefined);
  }, []);

  const onPopupReject = useCallback(() => {
    setSelectedVoucher(undefined);
  }, []);

  const onVoucherSelect = useCallback((voucher: VoucherEntity): void => {
    setSelectedVoucher(voucher);
  }, []);

  return (
    <>
      <VoucherList onVoucherSelect={onVoucherSelect} vouchers={vouchersMock} />
      {selectedVoucher && (
        <div className={styles.popupContainer}>
          <SellVoucherPopup
            forVoucher={selectedVoucher}
            onPopupReject={onPopupReject}
            onPopupSuccess={onPopupSuccess}
          />
        </div>
      )}
    </>
  );
};
