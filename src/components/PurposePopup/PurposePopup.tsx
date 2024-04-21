import { FC } from 'react';
import styles from './PurposePopup.module.scss';
import { Popup } from '../Popup';
import { useIntl } from 'react-intl';

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
      titleSize="medium"
    >
      <div className={styles.description}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially
      </div>
    </Popup>
  );
};
