import { FC, useState } from 'react';

import { AvailableVouchersList } from '../AvailableVouchersList';
import { Tabs, TabsProps } from '../Tabs';
import { SoldVoucherList } from '../SoldVouchersList';
import styles from './WithConnectedWallet.module.scss';
import { Collection } from '../../models/collection.ts';

export type WithSelectedCollectionProps = Readonly<{
  collection: Collection;
}>;

export const WithSelectedCollection: FC<WithSelectedCollectionProps> = ({ collection }) => {
  const [tabs] = useState<TabsProps['tabs']>([
    {
      label: 'activeVouchers',
      content: <AvailableVouchersList collection={collection} />,
    },
    {
      label: 'soldVouchers',
      content: <SoldVoucherList collection={collection} />,
    },
  ]);

  return (
    <div className={styles.tabsContainer}>
      <Tabs tabs={tabs} />
    </div>
  );
};
