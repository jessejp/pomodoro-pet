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
    <div className="fixed left-0 top-0 z-10 flex aspect-square h-screen min-h-160 w-full flex-col items-center justify-between bg-orange-circle-gradient from-transparent from-25% to-secondary-300 to-25% max-sm:from-30% max-sm:to-30% 2xl:from-20% 2xl:to-20%">
      <div className="relative top-6 h-32 w-[20.75rem]">
        <div className="flex flex-col p-4 bg-primary-100 text-center rounded-xl text-2xl font-semibold">
            <span>Session Length</span>
            <span>{(workTime + breakTime) * roundsAmount} minutes.</span>
        </div>
      </div>
      <Suspense fallback={null}>
        <WorkTimeButtonsCircle
          selectedMinutes={workTime}
          onWorkTimeSelected={(minutes: number) => {
            setWorkTime(minutes);
          }}
        />
      </Suspense>
      <div className="relative bottom-4 h-32">
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
