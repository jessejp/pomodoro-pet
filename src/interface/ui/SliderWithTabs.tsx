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
            className={clsx("rounded-t-xl px-2 py-[0.38rem]", {
              "bg-primary-100": activeTab === index,
              "bg-cool-150": activeTab !== index,
            })}
            key={index}
            onClick={() => {
              setActiveTab(index);
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="flex flex-col rounded-xl bg-primary-100 px-6 pb-4 pt-3 thin:px-8 w-full items-center">
        <div className="text-lg thin:text-md font-semibold text-center">
          {tabs[activeTab].value} {tabs[activeTab].valueLabel}
        </div>
        <input
          className="w-64 thin:w-40"
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
