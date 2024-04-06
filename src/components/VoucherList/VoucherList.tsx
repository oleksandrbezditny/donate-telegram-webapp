import styles from './VoucherList.module.scss';
import { Voucher, VoucherEntity } from '../Voucher';
import { FC } from 'react';

export type VoucherListProps = Readonly<{
  vouchers: VoucherEntity[];
  onVoucherSelect: (voucher: VoucherEntity) => void;
}>;

export const VoucherList: FC<VoucherListProps> = ({ onVoucherSelect, vouchers }) => {
  return (
    <div className={styles.container}>
      {vouchers.map((voucher, index) => (
        <div className={styles.voucherItem}>
          <Voucher onSelect={onVoucherSelect} voucher={voucher} key={index} />
        </div>
      ))}
    </div>
  );
};
