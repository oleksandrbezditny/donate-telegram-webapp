import { FC } from 'react';
import styles from './WalletView.module.scss';
import { TonConnectButton } from '@tonconnect/ui-react';

export type UnauthorizedPageProps = Readonly<{}>;

export const WalletView: FC<UnauthorizedPageProps> = () => {
  return (
    <div className={styles.container}>
      <TonConnectButton className={styles.button} />
    </div>
  );
};
