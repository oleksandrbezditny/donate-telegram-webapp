import { FC, useCallback } from 'react';
import styles from './Voucher.module.scss';

export type VoucherEntity = Readonly<{
  price: number;
}>;

export type VoucherProps = Readonly<{
  onSelect: (voucher: VoucherEntity) => void;
  voucher: VoucherEntity;
}>;

export const Voucher: FC<VoucherProps> = ({ onSelect, voucher }) => {
  const onClick = useCallback(() => {
    onSelect(voucher);
  }, [onSelect, voucher]);

  return (
    <>
      <div className={styles.wrapper} onClick={onClick}>
        <div className={styles.coverWrapper}>
          <div className={styles.cover}></div>
        </div>
        <div className={styles.info}>
          <div className={styles.infoTitle}>{voucher.price}</div>
        </div>
      </div>
    </>
  );
};
