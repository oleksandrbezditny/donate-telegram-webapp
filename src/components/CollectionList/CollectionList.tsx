import { FC, useCallback } from 'react';
import { Tile } from '../Tile';
import styles from './CollectionList.module.scss';
import { FormattedMessage } from 'react-intl';

type Collection = Readonly<{
  name: string;
  id: number;
}>;

type CollectionListProps = Readonly<{
  onCollectionSelect(selected: Collection): void;
}>;

const collections: Collection[] = [
  {
    name: 'Notcoin pre-market',
    id: 1,
  },
  {
    name: 'magnetic meridian',
    id: 2,
  },
];

export const CollectionList: FC<CollectionListProps> = ({ onCollectionSelect }) => {
  const onCollectionSelectHandler = useCallback(
    (collection: Collection) => () => {
      onCollectionSelect(collection);
    },
    [onCollectionSelect]
  );

  return (
    <>
      <h1 className={styles.header}>
        <FormattedMessage id="collections" />
      </h1>
      <div className={styles.container}>
        {collections.map((collection, index) => (
          <Tile
            onSelect={onCollectionSelectHandler(collection)}
            key={index}
            name={collection.name}
          />
        ))}
      </div>
    </>
  );
};
