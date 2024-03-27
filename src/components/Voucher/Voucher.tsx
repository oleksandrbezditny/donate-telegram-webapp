import { FC } from 'react';
import styles from './Voucher.module.scss';

export const Voucher: FC = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.coverWrapper}>
          <div className={styles.cover}></div>
        </div>
        <div className={styles.info}>
          <div className={styles.infoTitle}>10M Notcoin Voucher</div>
          <div className={styles.infoPrice}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.922 3h8.156c.533 0 .994 0 1.361.034.371.034.796.111 1.16.376.493.359.811.909.875 1.515.047.448-.097.854-.253 1.193-.154.335-.385.734-.651 1.196L10.78 17.35a.9.9 0 0 1-1.56 0L3.43 7.314c-.266-.462-.496-.861-.65-1.196-.156-.339-.301-.745-.254-1.193a2.15 2.15 0 0 1 .875-1.515c.365-.265.789-.342 1.16-.376C4.928 3 5.39 3 5.921 3zM4.449 4.874a.35.35 0 0 0-.131.228c.003.017.018.092.096.263.116.25.303.577.596 1.085l4.09 7.089V4.8H5.963c-.586 0-.963 0-1.237.026-.188.017-.26.042-.277.048zM10.9 4.8v8.739l4.09-7.09c.293-.507.48-.834.596-1.084.079-.17.094-.246.096-.263a.35.35 0 0 0-.131-.228 1.142 1.142 0 0 0-.276-.048C15 4.801 14.623 4.8 14.037 4.8H10.9z"
                fill="currentColor"
              ></path>
            </svg>
            <div>0.15 / 1M $NOT</div>
          </div>
        </div>
      </div>
    </>
  );
};
