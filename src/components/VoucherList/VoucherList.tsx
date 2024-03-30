import styles from './VoucherList.module.scss';
import { Voucher, VoucherEntity } from '../Voucher';
import { FC } from 'react';
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

export type VoucherListProps = Readonly<{
  onVoucherSelect: (voucher: VoucherEntity) => void;
}>;

export const VoucherList: FC<VoucherListProps> = ({ onVoucherSelect }) => {
  return (
    <div className={styles.container}>
      {vouchersMock.map((voucher, index) => (
        <div className={styles.voucherItem}>
          <Voucher onSelect={onVoucherSelect} voucher={voucher} key={index} />
        </div>
      ))}
    </div>
  );
};
