import { useState, Suspense } from "react";
import WorkTimeButtonsCircle from "./timer/WorkTimeButtonsCircle";
import { useBoundStore } from "../store/useBoundStore";
import SliderWithTabs from "./ui/SliderWithTabs";

const StartSessionMainMenu = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [roundsAmount, setRoundsAmount] = useState(1);
  const { start } = useBoundStore((state) => ({
    start: state.start,
  }));

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
      <Suspense fallback={null}>
        <WorkTimeButtonsCircle
          selectedMinutes={workTime}
          onWorkTimeSelected={(minutes: number) => {
            setWorkTime(minutes);
          }}
        />
      </Suspense>
      <div className="mb-4">
      <SliderWithTabs
        tabs={[
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
            value: roundsAmount,
            setMethod: setRoundsAmount,
            step: 1,
            min: 1,
            max: 8,
          },
        ]}
      /></div>
    </div>
  );
};

export default StartSessionMainMenu;
