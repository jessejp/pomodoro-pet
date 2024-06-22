import clsx from "clsx";
import React, { useState } from "react";

type SliderTabsProps = {
  tabs: {
    name: string;
    valueLabel: string;
    value: number;
    setMethod: (value: number) => void;
    step: number;
    min: number;
    max: number;
  }[];
};

const SliderWithTabs: React.FC<SliderTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2">
        {tabs.map((tab, index) => (
          <button
            className={clsx(
              "rounded-t-xl px-2 py-[0.38rem] font-semibold text-tertiary-800",
              {
                "bg-primary-100": activeTab === index,
                "bg-cool-150": activeTab !== index,
              }
            )}
            key={index}
            onClick={() => {
              setActiveTab(index);
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="flex w-full flex-col gap-2 items-center rounded-xl bg-primary-100 px-6 pb-4 pt-2 thin:px-8">
        <div className="text-center text-[24px] font-semibold text-tertiary-900 thin:text-md">
          {tabs[activeTab].value} {tabs[activeTab].valueLabel}
        </div>
        <input
          className="h-3 w-64 appearance-none rounded-full bg-secondary-100  accent-secondary-500 thin:w-40"
          type="range"
          name={tabs[activeTab].name}
          min={tabs[activeTab].min}
          max={tabs[activeTab].max}
          step={tabs[activeTab].step}
          value={tabs[activeTab].value}
          onChange={(e) => {
            tabs[activeTab].setMethod(e.target.valueAsNumber);
          }}
        />
      </div>
    </div>
  );
};

export default SliderWithTabs;
