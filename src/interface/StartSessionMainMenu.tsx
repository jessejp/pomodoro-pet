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

  const bgFiller = <div className="h-full w-full bg-tertiary-300"></div>;
  return (
    <div className="fixed left-0 top-0 z-10 grid h-screen w-screen grid-cols-startScreenBg items-center justify-center">
      {bgFiller}
      <div className="grid h-screen w-128 grid-cols-1 grid-rows-3 place-content-between items-center bg-orange-circle-gradient from-transparent from-[26%] to-tertiary-300 to-[26%] 2xl:short:from-30% 2xl:short:to-30% py-4 ">
        <div className="flex w-full justify-center self-start pt-6">
          <div className="flex min-w-[24rem] flex-col rounded-xl bg-primary-100 p-4 text-center text-lg font-semibold">
            <span>Session Length</span>
            <span>{(workTime + breakTime) * rounds} minutes</span>
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
        <div className="flex h-fit w-full flex-col items-center gap-4 self-end">
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
