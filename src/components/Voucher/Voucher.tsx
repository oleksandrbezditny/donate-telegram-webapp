import { FC, useCallback } from 'react';
import styles from './Voucher.module.scss';
import { useIntl } from 'react-intl';

export type VoucherEntity = Readonly<{
  id: number;
}>;

export type VoucherProps = Readonly<{
  onSelect: (voucher: VoucherEntity) => void;
  voucher: VoucherEntity;
}>;

export const Voucher: FC<VoucherProps> = ({ onSelect, voucher }) => {
  const onClick = useCallback(() => {
    onSelect(voucher);
  }, [onSelect, voucher]);
  const intl = useIntl();
  const voucherTitle = intl.formatMessage({ id: 'voucherTitle' });

  return (
    <>
      <div className={styles.wrapper} onClick={onClick}>
        <div className={styles.coverWrapper}>
          <div className={styles.cover}></div>
        </div>
        <div className={styles.info}>
          <div className={styles.infoTitle}>{voucherTitle}</div>
        </div>
      </div>
    </>
  );
};
