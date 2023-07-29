import { useState, useEffect } from "react";
import { usePomodoro } from "../utils/usePomodoro";
import CountdownClock from "./TimeSettings/CountdownClock";
import WorkTimeInput from "./TimeSettings/WorkTimeInput";

const TimeInterface = () => {
  const [workTime, setworkTime] = useState(0.15);
  const [breakTime, setbreakTime] = useState(0.15);
  const [roundsAmount, setRoundsAmount] = useState(1);
  const {
    start,
    stop,
    setIsRunning,
    isRunning,
    currentRound,
    rounds,
    pomodoroPhase,
    startTime,
  } = usePomodoro();

  useEffect(() => {
    if (currentRound >= rounds) return stop();
    if (pomodoroPhase !== "none") return setIsRunning(true);
  }, [pomodoroPhase, currentRound, rounds, setIsRunning, stop]);

  if (pomodoroPhase !== "none") {
    return (
      <>
        <div className="fixed top-6 z-30 flex h-max w-full flex-row items-end justify-between">
          <div className="mx-10 rounded border-4  border-violet-700 bg-orangeFlavour px-4 py-2 text-4xl font-bold text-violet-700">
            {isRunning && (
              <CountdownClock startTime={startTime} minutes={workTime} />
            )}
          </div>
          <div className="mx-10 rounded border-4 border-violet-700 bg-orangeFlavour px-4 py-2 text-2xl font-bold capitalize text-violet-700">
            <span>
              {pomodoroPhase} Round {currentRound + 1} / {rounds}
            </span>
          </div>
        </div>

        <div className="fixed bottom-6 z-30 flex h-max w-full flex-row items-end justify-around">
          <button
            className="rounded border-4  border-violet-700 bg-orangeFlavour px-4 py-2 text-2xl font-bold text-violet-700 hover:bg-orange-400"
            onClick={() => {
              stop();
            }}
          >
            Stop
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="fixed z-40 flex h-screen w-full flex-col items-center justify-center">
          <WorkTimeInput
            onWorkTimeSelected={(minutes: number) => {
              setworkTime(minutes);
            }}
          />
          <div className="fixed top-10 h-max w-max">
            <div className="text-1xl text-center font-bold">
              <span>Work for {workTime} minutes</span>
            </div>
            <div className="mt-4" />
            <button
              className="rounded border-4  border-violet-700 bg-orangeFlavour px-4 py-2 text-2xl font-bold text-violet-700 hover:bg-orange-400"
              onClick={() => {
                start({ rounds: roundsAmount, workTime, breakTime });
              }}
            >
              Start {workTime} minutes
            </button>
          </div>
          <div className="fixed bottom-0 z-30 flex h-max w-full flex-row flex-wrap items-end justify-around">
            <div className="text-1xl mb-6 flex flex-col text-center font-bold">
              <span>Break for {breakTime} minutes</span>
              <input
                className="w-64"
                type="range"
                name="breakTime"
                min={1}
                max={20}
                step={1}
                value={breakTime}
                onChange={(e) => {
                  setbreakTime(e.target.valueAsNumber);
                }}
              />
            </div>
            <div className="text-1xl mb-6 flex flex-col text-center font-bold">
              <span>Do {roundsAmount} rounds</span>
              <input
                className="w-64"
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
      </>
    );
  }
};

export default TimeInterface;
