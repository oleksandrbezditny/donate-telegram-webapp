import { FC, useCallback } from 'react';
import { VoucherList } from '../VoucherList';
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
  const onVoucherSelect = useCallback(() => {}, []);

  return <VoucherList onVoucherSelect={onVoucherSelect} vouchers={vouchersMock} />;
};
