import { FC, useCallback, useState } from 'react';
import { Loader } from '../Loader';
import styles from './UnauthorizedPage.module.scss';

export type UnauthorizedPageProps = Readonly<{
  onAuthorize: () => void;
}>;

export const UnauthorizedPage: FC<UnauthorizedPageProps> = ({ onAuthorize }) => {
  const [loading, setLoading] = useState(false);
  const processAuthorization = useCallback(async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    onAuthorize();
  }, [setLoading, onAuthorize]);

  return (
    <div className={styles.container}>
      <Loader display={loading} />
      <button className={styles.button} onClick={processAuthorization}>
        Connect
      </button>
    </div>
  );
};
