import { FC, useCallback, useState } from 'react';
import { WTFPopup } from '../WTFPopup';

export const WTFLink: FC = () => {
  const [popupIsOpened, setPopupIsOpened] = useState(false);

  const onOpenHandler = useCallback(() => {
    setPopupIsOpened(true);
  }, [setPopupIsOpened]);

  const onCloseHandler = useCallback(() => {
    setPopupIsOpened(false);
  }, [setPopupIsOpened]);

  return (
    <>
      <div onClick={onOpenHandler}>WTF?!</div>
      {popupIsOpened && <WTFPopup onClose={onCloseHandler}></WTFPopup>}
    </>
  );
};
