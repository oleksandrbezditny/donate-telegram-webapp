import { FC, ReactNode, useState } from 'react';
import styles from './Tabs.module.scss';
import { FormattedMessage } from 'react-intl';

export type TabsProps = Readonly<{
  tabs: {
    label: string;
    content: ReactNode;
  }[];
}>;

export const Tabs: FC<TabsProps> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.tabs}>
      <ul className={styles.tabsList}>
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`${styles.tabsListItem} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => handleClick(index)}
          >
            <FormattedMessage id={tab.label} />
          </li>
        ))}
      </ul>
      <div>
        {tabs.map((item, index) => (
          <div
            key={index}
            className={`${styles.tabsContentItem} ${activeIndex === index ? styles.active : styles.hidden}`}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};
