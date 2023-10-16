import { useState, Suspense } from "react";
import WorkTimeButtonsCircle from "./timer/WorkTimeButtonsCircle";
import { useBoundStore } from "../store/useBoundStore";
import SliderWithTabs from "./ui/SliderWithTabs";
import Button from "./ui/Button";

const StartSessionMainMenu = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [rounds, setRounds] = useState(2);
  const { start } = useBoundStore((state) => ({
    start: state.start,
  }));

  const bgFiller = <div className="h-full w-full bg-tertiary-300"></div>;

  return (
    <div className="fixed left-0 top-0 z-10 grid h-full w-screen grid-cols-startScreenBg items-center justify-center">
      {bgFiller}
      <div className="grid h-screen min-h-160 grid-cols-1 grid-rows-startScreenInputs place-content-between items-center">
        <div className="flex h-full w-full items-start justify-center self-start bg-tertiary-300 pt-10">
          <div className="flex min-w-[24rem] flex-col rounded-xl bg-primary-100 p-4 text-center text-lg font-semibold thin:min-w-min thin:px-8 thin:text-md">
            <span>Session Length</span>
            <span>{(workTime + breakTime) * rounds} minutes</span>
          </div>
        </div>
        <div className="h-128 w-128 bg-orange-circle-gradient from-transparent from-45% to-tertiary-300 to-45%">
          <Suspense fallback={null}>
            <WorkTimeButtonsCircle
              selectedMinutes={workTime}
              onWorkTimeSelected={(minutes: number) => {
                setWorkTime(minutes);
              }}
            />
          </Suspense>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-end gap-4 self-end bg-tertiary-300 pb-4 thin:flex-row thin:items-end">
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
      {bgFiller}
    </div>
  );
};

export default StartSessionMainMenu;
