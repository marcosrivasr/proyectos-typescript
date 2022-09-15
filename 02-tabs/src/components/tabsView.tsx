import { useState } from "react";
import type { TabItem } from "./typeTabsView";
import styles from "./tabsView.module.css";
import classnames from "classnames";

interface TabsViewProps {
  items: TabItem[];
  onChange: (item: TabItem) => void;
}

export default function TabsView({ items }: TabsViewProps) {
  const [selected, setSelected] = useState<number | null>(
    items.length >= 0 ? 0 : null
  );

  function handleClick(index: number) {
    setSelected(index);
  }

  if (selected === null) {
    return null;
  }

  return (
    <div>
      <div className={styles.tabsContainer}>
        {items.map((item, index) => (
          <TabView
            index={index}
            active={index === selected}
            item={item}
            onClick={handleClick}
          />
        ))}
      </div>
      <div>
        <div className={styles.contentContainer}>
          {items.map((item, index) => (
            <>
              {selected === index && (
                <div>
                  <item.content />
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

interface TabViewProps {
  index: number;
  active: boolean;
  item: TabItem;
  onClick: (index: number) => void;
}

function TabView({ index, active, item, onClick }: TabViewProps) {
  return active ? (
    <div className={classnames(styles.tab, styles.activeTab)}>{item.title}</div>
  ) : (
    <button className={styles.tab} onClick={() => onClick(index)}>
      {item.title}
    </button>
  );
}
