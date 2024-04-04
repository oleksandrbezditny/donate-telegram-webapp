import { FC } from 'react';
import styles from './UnauthorizedPage.module.scss';
import { TonConnectButton } from '@tonconnect/ui-react';

export type UnauthorizedPageProps = Readonly<{
  onAuthorize: () => void;
}>;

export const UnauthorizedPage: FC<UnauthorizedPageProps> = () => {
  return (
    <div className={styles.container}>
      <TonConnectButton className={styles.button} />
    </div>
  );
};
