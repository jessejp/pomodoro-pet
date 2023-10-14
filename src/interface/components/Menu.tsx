import React, { useState, type PropsWithChildren } from "react";
import clsx from "clsx";

type Tab = {
  icon: string;
  component: JSX.Element;
};

interface MenuProps {
  tabs: Tab[];
}

const Menu: React.FC<PropsWithChildren<MenuProps>> = ({ tabs }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  return (
    <div className="fixed bottom-4 w-fit min-w-[30rem] thin:relative thin:bottom-0 thin:w-full">
      <div className="absolute -top-12 left-6 flex items-center gap-1">
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
      <div className="flex h-full flex-col justify-between rounded-xl bg-primary-100 px-8 py-4">
        <div className="h-4/5 w-full max-w-7xl self-center">
          {tabs[selectedTabIndex].component}
        </div>
      </div>
    </div>
  );
};

export default Menu;
