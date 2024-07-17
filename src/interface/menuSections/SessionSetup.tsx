import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { useBoundStore } from "../../store/useBoundStore";

interface SessionSetupProps {}

const SessionSetup: React.FC<SessionSetupProps> = ({}) => {
  const [breakTime, setBreakTime] = useState(5);
  const [rounds, setRounds] = useState(2);

  return (
    <div className="flex w-full items-center justify-between bg-primary-100">
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
          <div className="flex flex-col items-center gap-2 rounded-xl px-6 pb-4 pt-2">
            <label
              htmlFor={range.name}
              className="text-center text-[24px] font-semibold text-tertiary-900"
            >
              {range.value} {range.valueLabel}
            </label>
            <input
              className="h-3 w-64 appearance-none rounded-full bg-secondary-100 accent-secondary-500"
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
      <Link className="flex w-full justify-center" to="focus-session">
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
