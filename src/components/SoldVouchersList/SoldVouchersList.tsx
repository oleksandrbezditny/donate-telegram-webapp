import { FC, useCallback, useState } from 'react';
import { VoucherList } from '../VoucherList';
import { VoucherEntity } from '../../models';
import { Collection } from '../../models/collection.ts';
import { CancelSalePopup } from '../CancelSalePopup';

const vouchersMock: VoucherEntity[] = [
  {
    id: 1,
    price: 10000000,
  },
  {
    id: 2,
    price: 10000000,
  },
  {
    id: 3,
    price: 10000000,
  },
  {
    id: 4,
    price: 10000000,
  },
  {
    id: 5,
    price: 10000000,
  },
];

export type SoldVoucherListProps = Readonly<{
  collection: Collection;
}>;

export const SoldVoucherList: FC<SoldVoucherListProps> = () => {
  const [cancelSalePopupShown, setCancelSalePopupShown] = useState(false);
  const onVoucherSelect = useCallback(() => {
    setCancelSalePopupShown(true);
  }, []);

  const onRejectHandler = useCallback(() => {
    setCancelSalePopupShown(false);
  }, []);

  const onSuccessHandler = useCallback(() => {
    setCancelSalePopupShown(false);
  }, []);

  return (
    <>
      {cancelSalePopupShown && (
        <CancelSalePopup onSuccess={onSuccessHandler} onReject={onRejectHandler} />
      )}
      <VoucherList onVoucherSelect={onVoucherSelect} vouchers={vouchersMock} />
    </>
  );
};
