import { FC } from 'react';
import styles from './BackButton.module.scss';

export type BackButtonProps = Readonly<{
  onPress: () => void;
}>;

export const BackButton: FC<BackButtonProps> = ({ onPress }) => (
  <div className={styles.backButton} onClick={onPress}></div>
);
