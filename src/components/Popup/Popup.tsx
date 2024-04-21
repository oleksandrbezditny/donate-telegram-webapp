import { FC, ReactNode, useEffect, useState } from 'react';
import styles from './Popup.module.scss';
import { useIntl } from 'react-intl';

export type PopupProps = Readonly<{
  title: string;
  titleSize: 'medium' | 'big';
  children: ReactNode;
  onSuccess?: () => void;
  onReject?: () => void;
  withProceedButton: boolean;
  proceedButtonTitle?: string;
  proceedButtonDisabled: boolean;
  withCancelButton: boolean;
  cancelButtonTitle?: string;
}>;

export const Popup: FC<PopupProps> = ({
  children,
  title,
  titleSize,
  proceedButtonTitle,
  onSuccess,
  onReject,
  proceedButtonDisabled,
  withCancelButton,
  cancelButtonTitle,
  withProceedButton,
}) => {
  const intl = useIntl();
  const _cancelTitle = cancelButtonTitle ?? intl.formatMessage({ id: 'cancelTitle' });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    return () => setIsOpen(false);
  }, []);

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.overlay}>
          <div className={isOpen ? styles.popupOpen : styles.popupClosed}>
            <div className={styles.body}>
              <div className={styles.content}>
                <div
                  className={styles.title}
                  style={{ fontSize: titleSize === 'big' ? '40px' : '25px' }}
                >
                  {title}
                </div>
                <div>
                  <div className={styles.inner}>{children}</div>
                  <div className={styles.buttons}>
                    {withProceedButton && (
                      <button className={styles.button}>
                        <div className={styles.buttonInner}>
                          <div>
                            <div
                              className={`${proceedButtonDisabled && styles.buttonDisabled}`}
                              onClick={onSuccess}
                            >
                              {proceedButtonTitle}
                            </div>
                          </div>
                        </div>
                      </button>
                    )}

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
