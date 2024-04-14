import { FC, useCallback } from 'react';
import styles from './Tile.module.scss';

export type TileProps = Readonly<{
  onSelect: () => void;
  name: string;
}>;

export const Tile: FC<TileProps> = ({ onSelect, name }) => {
  const onClick = useCallback(() => {
    onSelect();
  }, [onSelect]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper} onClick={onClick}>
        <div className={styles.coverWrapper}>
          <div className={styles.cover}></div>
        </div>
        <div className={styles.info}>
          <div className={styles.infoTitle}>{name}</div>
        </div>
      </div>
    </div>
  );
};
