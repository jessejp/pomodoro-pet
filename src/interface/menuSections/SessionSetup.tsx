import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { useBoundStore } from "../../store/useBoundStore";

interface SessionSetupProps {}

const SessionSetup: React.FC<SessionSetupProps> = ({}) => {
  const [breakTime, setBreakTime] = useState(5);
  const [rounds, setRounds] = useState(2);

  return (
    <div className="flex items-center justify-between w-full bg-primary-100">
      <div className="flex flex-col">
        {[
          {
            name: "Break",
            valueLabel: "minutes",
            value: breakTime,
            setFunc: setBreakTime,
            step: 1,
            min: 1,
            max: 20,
          },
          {
            name: "Rounds",
            valueLabel: "rounds",
            value: rounds,
            setFunc: setRounds,
            step: 1,
            min: 1,
            max: 8,
          },
        ].map((range) => (
          <div className="flex flex-col gap-2 items-center rounded-xl px-6 pb-4 pt-2 thin:px-8">
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
                range.setFunc(e.target.valueAsNumber);
              }}
            />
          </div>
        ))}
      </div>
      <Link className="w-full flex justify-center" to="focus-session">
        <img
          className="w-16"
          src={`/icons/play-tertiary-900.svg`}
          alt={`customize character button`}
        />
      </Link>
    </div>
  );
};

export default SessionSetup;
