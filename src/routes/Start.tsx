import CircularSlider from "@fseehawer/react-circular-slider";
import React, { Suspense, useState } from "react";
import Button from "../interface/ui/Button";
import SliderWithTabs from "../interface/ui/SliderWithTabs";
import { useControls } from "leva";
import { useBoundStore } from "../store/useBoundStore";
import { Link } from "react-router-dom";

const ConfigSession: React.FC = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [rounds, setRounds] = useState(2);
  const { start } = useBoundStore((state) => ({
    start: state.start,
  }));

  const ctrls = useControls("App.CustomTimers", {
    workTime: 0,
    breakTime: 0,
    rounds: 0,
  });

  return (
    <>
      <div className="h-full w-full flex justify-center items-center">
        <Suspense fallback={null}>
          <CircularSlider
            renderLabelValue={
              <div className="absolute top-1 grid h-full w-full place-content-center text-center font-semibold">
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
      </div>
      <div className="flex w-full flex-col items-center justify-end self-end pb-4 gap-8">
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
        <aside className="relative flex w-full flex-col items-center justify-center gap-2">
          <Link to="focus-session">
            <Button
              intent="primary"
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
          </Link>
        </aside>
      </div>
    </>
  );
};

export default ConfigSession;
