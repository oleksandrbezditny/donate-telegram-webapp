import { WalletView } from './components/WalletView/WalletView.tsx';
import { CollectionList } from './components';
import { BackButton, LanguageSelector, WithSelectedCollection } from './components';
import { useTonWallet } from '@tonconnect/ui-react';
import { useCallback, useState } from 'react';
import { Collection } from './models/collection.ts';
import styles from './App.module.scss';
import { WTFLink } from './components/WTFLink';

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
          <WalletView />
        </div>
      </div>

      {wallet && (
        <>
          {selectedCollection ? (
            <WithSelectedCollection collection={selectedCollection} />
          ) : (
            <CollectionList onCollectionSelect={onCollectionSelectHandler} />
          )}
        </>
      )}
    </>
  );
}

export default App;
