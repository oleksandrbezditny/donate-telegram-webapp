import styles from './VoucherList.module.scss';
import { Tile } from '../Tile';
import { FC, useCallback } from 'react';
import { VoucherEntity } from '../../models';
import { useIntl } from 'react-intl';

export type VoucherListProps = Readonly<{
  vouchers: VoucherEntity[];
  onVoucherSelect: (voucher: VoucherEntity) => void;
}>;

export const VoucherList: FC<VoucherListProps> = ({ onVoucherSelect, vouchers }) => {
  const intl = useIntl();
  const voucherTitle = intl.formatMessage({ id: 'voucherTitle' });

  const onVoucherSelectHandler = useCallback(
    (voucher: VoucherEntity) => () => {
      onVoucherSelect(voucher);
    },
    [onVoucherSelect]
  );

  return (
    <div className={styles.container}>
      {vouchers.map((voucher, index) => (
        <Tile onSelect={onVoucherSelectHandler(voucher)} key={index} name={voucherTitle} />
      ))}
    </div>
  );
};
