import { FC, useCallback, useState } from 'react';
import styles from './PurposeButton.module.scss';
import { FormattedMessage } from 'react-intl';
import { PurposePopup } from '../PurposePopup/PurposePopup.tsx';

export const PurposeButton: FC = () => {
  const [popupShown, setPopupShown] = useState(false);

  const hidePopup = useCallback(() => {
    setPopupShown(false);
  }, [setPopupShown]);

  const showPopup = useCallback(() => {
    setPopupShown(true);
  }, [setPopupShown]);

  return (
    <>
      {popupShown && <PurposePopup onReject={hidePopup} />}
      <div className={styles.purposeMessage} onClick={showPopup}>
        <FormattedMessage id="purpose" />
      </div>
    </>
  );
};
