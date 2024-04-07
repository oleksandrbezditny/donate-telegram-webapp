import { FC, useCallback } from 'react';
import { VoucherList } from '../VoucherList';
import { VoucherEntity } from '../Voucher';

const vouchersMock: VoucherEntity[] = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];

export type SoldVoucherListProps = Readonly<{}>;

export const SoldVoucherList: FC<SoldVoucherListProps> = () => {
  const onVoucherSelect = useCallback(() => {}, []);

  return <VoucherList onVoucherSelect={onVoucherSelect} vouchers={vouchersMock} />;
};
