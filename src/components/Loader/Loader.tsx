import { FC } from 'react';
import styles from './Loader.module.scss';
export const Loader: FC<{ display: boolean }> = ({ display }) => {
  if (!display) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
};
