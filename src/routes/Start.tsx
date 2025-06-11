import React, { useState } from "react";
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
      </div>
      <div className="flex w-full flex-col items-center justify-end self-end pb-4 gap-8">
        <SliderWithTabs
          tabs={[
            {
              name: "Work Time",
              valueLabel: "minutes",
              value: workTime,
              setMethod: setWorkTime,
              step: 1,
              min: 5,
              max: 60,
            },
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
          <Link to="../focus-session">
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
