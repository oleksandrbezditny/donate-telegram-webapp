import { FC, useState } from 'react';

import { AvailableVouchersList } from '../AvailableVouchersList/AvailableVouchersList.tsx';
import { Tabs, TabsProps } from '../Tabs';

export const WithConnectedWallet: FC = () => {
  const [tabs] = useState<TabsProps['tabs']>([
    {
      label: 'Active vouchers',
      content: <AvailableVouchersList />,
    },
    {
      label: 'Sold vouchers',
      content: <AvailableVouchersList />,
    },
  ]);

  return <Tabs tabs={tabs} />;
};
