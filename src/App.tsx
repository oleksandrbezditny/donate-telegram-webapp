import { WalletView } from './components';
import { CollectionList } from './components';
import { BackButton, LanguageSelector, WithSelectedCollection } from './components';
import { useTonWallet } from '@tonconnect/ui-react';
import { FC, useCallback, useState } from 'react';
import { Collection } from './models/collection.ts';
import styles from './App.module.scss';
import { WTFLink } from './components';
import { FormattedMessage } from 'react-intl';

function App() {
  const wallet = useTonWallet();
  const [selectedCollection, setSelectedCollection] = useState<Collection | undefined>(undefined);

  const onCollectionSelectHandler = useCallback(
    (collection: Collection) => {
      setSelectedCollection(collection);
    },
    [setSelectedCollection]
  );

  const onBackButtonHandler = useCallback(() => {
    setSelectedCollection(undefined);
  }, [setSelectedCollection]);

  return (
    <>
      <div>
        <div className={styles.header}>
          {selectedCollection ? <BackButton onPress={onBackButtonHandler} /> : <WTFLink />}
          <LanguageSelector />
          {wallet && <WalletView />}
        </div>
      </div>

      {!wallet && <WithoutWallet />}

      {wallet && (
        <WithWallet
          selectedCollection={selectedCollection}
          onCollectionSelectHandler={onCollectionSelectHandler}
        />
      )}
    </>
  );
}

const WithoutWallet: FC = () => (
  <div className={styles.notConnectedWallet}>
    <div className={styles.greeting}>
      <FormattedMessage id="greeting" />
    </div>

    <WalletView />
  </div>
);

const WithWallet: FC<{
  selectedCollection?: Collection;
  onCollectionSelectHandler: (collection: Collection) => void;
}> = ({ selectedCollection, onCollectionSelectHandler }) => (
  <>
    {selectedCollection ? (
      <WithSelectedCollection collection={selectedCollection} />
    ) : (
      <CollectionList onCollectionSelect={onCollectionSelectHandler} />
    )}
  </>
);

export default App;
