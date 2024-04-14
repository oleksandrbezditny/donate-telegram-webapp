import { FC } from 'react';
import styles from './WalletView.module.scss';
import { TonConnectButton } from '@tonconnect/ui-react';

export const WalletView: FC = () => {
  return (
    <div className={styles.container}>
      <TonConnectButton className={styles.button} />
    </div>
  );
};
