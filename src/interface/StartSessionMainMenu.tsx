import { useState, Suspense } from "react";
import WorkTimeButtonsCircle from "./timer/WorkTimeButtonsCircle";
import { useBoundStore } from "../store/useBoundStore";
import SliderWithTabs from "./ui/SliderWithTabs";
import Button from "./ui/Button";
import { useControls } from "leva";
import CircularSlider from "@fseehawer/react-circular-slider";

const StartSessionMainMenu = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [rounds, setRounds] = useState(2);
  const { start, updateCosmetic } = useBoundStore((state) => ({
    start: state.start,
    updateCosmetic: state.updateCosmetic,
  }));

  const ctrls = useControls("App.CustomTimers", {
    workTime: 0,
    breakTime: 0,
    rounds: 0,
  });

  return (
    <div className="relative flex h-screen flex-col items-center justify-between gap-16 bg-tertiary-300 short:justify-end">
      <button className="mr-8 mt-8 grid place-content-center self-end rounded-full border-4 border-tertiary-800 bg-primary-200 p-3 hover:scale-105 hover:bg-primary-100 short:fixed short:top-0">
        <img
          className="h-8 w-8"
          src={`/icons/customize-x24-tertiary-800.svg`}
          alt={`customize character button`}
        />
      </button>
      <Suspense fallback={null}>
        <CircularSlider
          renderLabelValue={
            <div className="absolute top-0 grid h-full w-full place-content-center text-center font-semibold">
              <div className="text-2xl text-tertiary-900">{workTime}</div>
              <div className="text-lg text-tertiary-900">minutes</div>
            </div>
          }
          data={Array.from({ length: 12 }).map((_, index) => index * 5 + 5)}
          dataIndex={4}
          progressSize={16}
          initialValue={workTime}
          progressColorFrom="#FFE576"
          progressColorTo="#FFE576"
          trackColor="#FFFAE4"
          knobColor="#FFE576"
          knobSize={48}
          trackSize={16}
          label="minutes"
          labelBottom={true}
          onChange={(value: number) => {
            setWorkTime(value);
          }}
        />
      </Suspense>
      <div className="flex w-full flex-col items-center justify-end gap-4 self-end pb-4">
        <div className="flex flex-col gap-6">
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
            variant="big"
            icon="check-tertiary-900"
            onClick={() => {
              start({
                workTime: ctrls.workTime || workTime,
                breakTime: ctrls.breakTime || breakTime,
                rounds: ctrls.rounds || rounds,
              });
            }}
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartSessionMainMenu;
