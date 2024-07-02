import React, { useState } from "react";

interface SessionSetupProps {}

const SessionSetup: React.FC<SessionSetupProps> = ({}) => {
  const [breakTime, setBreakTime] = useState(5);
  const [rounds, setRounds] = useState(2);
  return (
    <div className="w-full bg-primary-100">
      {[
        {
          name: "Break",
          valueLabel: "minutes",
          value: breakTime,
          setMethod: setBreakTime,
          step: 1,
          min: 1,
          max: 20,
        },
        {
          name: "Rounds",
          valueLabel: "rounds",
          value: rounds,
          setMethod: setRounds,
          step: 1,
          min: 1,
          max: 8,
        },
      ].map((range) => (
        <div className="flex flex-col gap-2 w-48 items-center rounded-xl px-6 pb-4 pt-2 thin:px-8">
          <label
            htmlFor={range.name}
            className="text-center text-[24px] font-semibold text-tertiary-900 thin:text-md"
          >
            {range.value} {range.valueLabel}
          </label>
          <input
            className="h-3 w-64 appearance-none rounded-full bg-secondary-100  accent-secondary-500 thin:w-40"
            type="range"
            name={range.name}
            min={range.min}
            max={range.max}
            step={range.step}
            value={range.value}
            onChange={(e) => {
              range.setMethod(e.target.valueAsNumber);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SessionSetup;
