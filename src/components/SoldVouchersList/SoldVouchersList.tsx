import { FC, useCallback } from 'react';
import { VoucherList } from '../VoucherList';
import { VoucherEntity } from '../Voucher';

const vouchersMock: VoucherEntity[] = [
  {
    price: 100500,
  },
  {
    price: 100400,
  },
  {
    price: 100200,
  },
  {
    price: 100100,
  },
  {
    price: 100000,
  },
];

export type SoldVoucherListProps = Readonly<{}>;

export const SoldVoucherList: FC<SoldVoucherListProps> = () => {
  const onVoucherSelect = useCallback(() => {}, []);

  return <VoucherList onVoucherSelect={onVoucherSelect} vouchers={vouchersMock} />;
};
