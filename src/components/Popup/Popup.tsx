import { FC, ReactNode, useEffect, useState } from 'react';
import styles from './Popup.module.scss';
import { useIntl } from 'react-intl';

export type PopupProps = Readonly<{
  title: string;
  buttonText: string;
  buttonDisabled: boolean;
  children: ReactNode;
  onSuccess: () => void;
  onReject: () => void;
  withCancelButton: boolean;
  cancelTitle?: string;
}>;

export const Popup: FC<PopupProps> = ({
  children,
  title,
  buttonText,
  onSuccess,
  onReject,
  buttonDisabled,
  withCancelButton,
  cancelTitle,
}) => {
  const intl = useIntl();
  const _cancelTitle = cancelTitle ?? intl.formatMessage({ id: 'cancelTitle' });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    return () => setIsOpen(false);
  }, []);

  return (
    <div>
      <div className={styles.root}>
        <div className={styles.overlay}>
          <div className={isOpen ? styles.popupOpen : styles.popupClosed}>
            <div className={styles.body}>
              <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div>
                  <div className={styles.inner}>{children}</div>
                  <div className={styles.buttons}>
                    <button className={styles.button}>
                      <div className={styles.buttonInner}>
                        <div>
                          <div
                            className={`${buttonDisabled && styles.buttonDisabled}`}
                            onClick={onSuccess}
                          >
                            {buttonText}
                          </div>
                        </div>
                      </div>
                    </button>

                    {withCancelButton && (
                      <button className={styles.buttonCancel}>
                        <div className={styles.buttonInner}>
                          <div>
                            <div onClick={onReject}>{_cancelTitle}</div>
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
