import { FC, useState } from 'react';

import { AvailableVouchersList } from '../AvailableVouchersList/AvailableVouchersList.tsx';
import { Tabs, TabsProps } from '../Tabs';
import { SoldVoucherList } from '../SoldVouchersList';
import styles from './WithConnectedWallet.module.scss';

export const WithConnectedWallet: FC = () => {
  const [tabs] = useState<TabsProps['tabs']>([
    {
      label: 'active-vouchers',
      content: <AvailableVouchersList />,
    },
    {
      label: 'sold-vouchers',
      content: <SoldVoucherList />,
    },
  ]);

  return (
    <div className={styles.tabsContainer}>
      <Tabs tabs={tabs} />
    </div>
  );
};
