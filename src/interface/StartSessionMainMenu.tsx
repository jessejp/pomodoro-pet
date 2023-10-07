import { useState } from "react";
import { usePomodoro } from "../stores/usePomodoro";
import WorkTimeInput from "./timer/WorkTimeInput";

const StartSessionMainMenu = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [roundsAmount, setRoundsAmount] = useState(1);
  const { start } = usePomodoro();

  return (
    <div className="fixed left-0 top-0 z-10 flex aspect-square h-screen min-h-160 w-full flex-col items-center justify-between bg-orange-circle-gradient from-transparent from-25% to-orangeFlavour to-25% max-sm:from-30% max-sm:to-30% 2xl:from-20% 2xl:to-20%">
      <div className="relative top-6 h-max w-max">
        <div className="text-1xl text-center font-bold">
          <span>
            Total session length is {(workTime + breakTime) * roundsAmount}{" "}
            minutes.
          </span>
        </div>
        <div className="mt-4" />
        <button
          className="rounded border-4 border-violet-700 bg-orangeFlavour px-4 py-2 text-2xl font-bold text-violet-700 hover:bg-orange-400"
          onClick={() => {
            start({ rounds: roundsAmount, workTime, breakTime });
          }}
        >
          Start {workTime} minutes
        </button>
      </div>
      <WorkTimeInput
        selectedMinutes={workTime}
        onWorkTimeSelected={(minutes: number) => {
          setWorkTime(minutes);
        }}
      />
      <div className="relative bottom-1/14 flex h-max w-11/12 flex-row items-end justify-around gap-2 max-sm:w-full max-sm:justify-center md:bottom-1/20">
        <div className="flex w-fit flex-col items-center gap-2 rounded border-4 border-violet-700 bg-orangeFlavour px-4 py-4 text-2xl font-bold text-violet-700 max-sm:px-2 max-sm:text-sm">
          <span className="whitespace-nowrap">
            Break for {breakTime} minutes
          </span>
          <input
            className="w-64 accent-violet-700 max-sm:w-24"
            type="range"
            name="breakTime"
            min={1}
            max={20}
            step={1}
            value={breakTime}
            onChange={(e) => {
              setBreakTime(e.target.valueAsNumber);
            }}
          />
        </div>
        <div className="flex w-fit flex-col items-center gap-2 rounded border-4 border-violet-700 bg-orangeFlavour px-4 py-4 text-2xl font-bold text-violet-700 max-sm:px-2 max-sm:text-sm">
          <span>Do {roundsAmount} rounds</span>
          <input
            className="w-64 accent-violet-700 max-sm:w-24"
            type="range"
            name="roundsAmount"
            min={1}
            max={8}
            step={1}
            value={roundsAmount}
            onChange={(e) => {
              setRoundsAmount(e.target.valueAsNumber);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StartSessionMainMenu;
