import { FC, ReactNode } from 'react';
import styles from './Popup.module.scss';

export type PopupProps = Readonly<{
  title: string;
  buttonText: string;
  children: ReactNode;
  onSuccess: () => void;
  onReject: () => void;
}>;

export const Popup: FC<PopupProps> = ({ children, title, buttonText, onSuccess, onReject }) => {
  return (
    <div>
      <div className={styles.root}>
        <div className={styles.overlay}>
          <div className={styles.wrapper}>
            <div className={styles.body}>
              <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div>
                  <div className={styles.inner}>{children}</div>
                  <div>
                    <button className={styles.button}>
                      <div className={styles.buttonInner}>
                        <div>
                          <div className={styles.buttonText} onClick={onSuccess}>
                            {buttonText}
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.close} onClick={onReject}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.36321 4.3637C4.71469 4.01223 5.28453 4.01223 5.63601 4.3637L11.9996 10.7273L18.3632 4.3637C18.7147 4.01223 19.2845 4.01223 19.636 4.3637C19.9875 4.71517 19.9875 5.28502 19.636 5.63649L13.2724 12.0001L19.636 18.3637C19.9875 18.7152 19.9875 19.285 19.636 19.6365C19.2845 19.988 18.7147 19.988 18.3632 19.6365L11.9996 13.2729L5.63601 19.6365C5.28453 19.988 4.71469 19.988 4.36321 19.6365C4.01174 19.285 4.01174 18.7152 4.36321 18.3637L10.7268 12.0001L4.36321 5.63649C4.01174 5.28502 4.01174 4.71517 4.36321 4.3637Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
