import React, { useState, type PropsWithChildren } from "react";
import clsx from "clsx";
import { usePomodoro } from "../../utils/usePomodoro";

type Tab = {
  icon: string;
  component: JSX.Element;
};

interface MenuProps {
  tabs: Tab[];
}

const Menu: React.FC<PropsWithChildren<MenuProps>> = ({ tabs }) => {
  const { stop } = usePomodoro();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  return (
    <div className="relative max-h-[40%] w-full">
      <div className="absolute -top-12 left-2 flex items-center gap-1">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={clsx(
              "rounded-tl rounded-tr border-4 border-violet-700 bg-orangeFlavour px-3 pb-2 pt-2 text-center text-lg",
              { "bg-gray-400": selectedTabIndex !== index },
              { "border-b-transparent": selectedTabIndex === index }
            )}
            onClick={() => {
              setSelectedTabIndex(index);
            }}
          >
            {tab.icon}
          </div>
        ))}
      </div>
      <div className="flex h-full flex-col justify-between border-4 border-violet-700 bg-orangeFlavour px-4 py-4">
        <div className="h-4/5 w-full max-w-7xl self-center">
          {tabs[selectedTabIndex].component}
        </div>
        <div className="h-fit w-full max-w-2xl self-center border-t-2 border-violet-500 pt-2">
          <button
            className="w-fit rounded border-4 border-violet-700 bg-orangeFlavour px-4 py-2 text-2xl font-bold text-violet-700 hover:bg-orange-400 max-sm:text-lg"
            onClick={() => {
              stop();
            }}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
