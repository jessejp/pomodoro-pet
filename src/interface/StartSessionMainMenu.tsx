import { useState, Suspense } from "react";
import WorkTimeButtonsCircle from "./timer/WorkTimeButtonsCircle";
import { useBoundStore } from "../store/useBoundStore";
import SliderWithTabs from "./ui/SliderWithTabs";
import Button from "./ui/Button";

const StartSessionMainMenu = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [rounds, setRounds] = useState(1);
  const { start } = useBoundStore((state) => ({
    start: state.start,
  }));

  return (
    <div className="thin:from-30% thin:to-30% 2xl:from-15% 2xl:to-15% fixed left-0 top-0 z-10 flex aspect-square h-screen w-full flex-col items-center justify-between bg-orange-circle-gradient from-transparent from-25% to-tertiary-300 to-25%">
      <div className="relative top-6 h-fit w-[20.75rem]">
        <div className="flex flex-col rounded-xl bg-primary-100 p-4 text-center text-lg font-semibold">
          <span>Session Length</span>
          <span>{(workTime + breakTime) * rounds} minutes.</span>
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
      <div className="relative bottom-4 flex h-fit w-full flex-col items-center gap-4">
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
              value: rounds,
              setMethod: setRounds,
              step: 1,
              min: 1,
              max: 8,
            },
          ]}
        />
        <Button
          intent="accent"
          icon="check-tertiary-900"
          position="bottom-right"
          onClick={() => {
            start({ workTime, breakTime, rounds });
          }}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default StartSessionMainMenu;
