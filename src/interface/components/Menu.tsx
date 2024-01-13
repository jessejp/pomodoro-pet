import React, { useState, type PropsWithChildren } from "react";
import clsx from "clsx";

type Tab = {
  icon: string;
  component: JSX.Element;
};

interface MenuProps {
  isFixed?: boolean;
  tabs: Tab[];
}

const Menu: React.FC<PropsWithChildren<MenuProps>> = ({ tabs }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  return (
    <div className="w-full max-w-2xl">
      <div className="flex w-full gap-2 px-6">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={clsx(
              "rounded-t-xl px-2 py-[0.38rem] text-center text-lg",
              { "bg-cool-200": selectedTabIndex !== index },
              {
                "bg-primary-100": selectedTabIndex === index,
              }
            )}
            onClick={() => {
              setSelectedTabIndex(index);
            }}
          >
            <img src={`/icons/${tab.icon}.svg`} alt={`${tab.icon} icon`} />
          </div>
        ))}
      </div>
      <div className="flex h-full flex-col justify-between">
        <div className={clsx("h-4/5 w-full")}>
          {tabs[selectedTabIndex].component}
        </div>
      </div>
    </div>
  );
};

export default Menu;
