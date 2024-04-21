import { FC } from 'react';
import styles from './PurposePopup.module.scss';
import { Popup } from '../Popup';
import { FormattedMessage, useIntl } from 'react-intl';

export type PurposePopupProps = Readonly<{
  onReject: () => void;
}>;

export const PurposePopup: FC<PurposePopupProps> = ({ onReject }) => {
  const intl = useIntl();
  const popupTitle = intl.formatMessage({ id: 'purpose' });

  return (
    <Popup
      title={popupTitle}
      titleSize="medium"
      proceedButtonDisabled={true}
      onReject={onReject}
      withProceedButton={false}
      withCancelButton={true}
    >
      <div className={styles.description}>
        <FormattedMessage id="purposeText" />
      </div>
    </Popup>
  );
};
