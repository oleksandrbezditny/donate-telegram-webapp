import { FC, useCallback } from 'react';
import { VoucherList } from '../VoucherList';
import { VoucherEntity } from '../Voucher';

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

export type SoldVoucherListProps = Readonly<{}>;

export const SoldVoucherList: FC<SoldVoucherListProps> = () => {
  const onVoucherSelect = useCallback(() => {}, []);

  return <VoucherList onVoucherSelect={onVoucherSelect} vouchers={vouchersMock} />;
};
