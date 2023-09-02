import { useState, useEffect } from "react";
import { usePomodoro } from "../utils/usePomodoro";
import CountdownClock from "./timer/CountdownClock";
import WorkTimeInput from "./timer/WorkTimeInput";

const TimeInterface = () => {
  const [workTime, setWorkTime] = useState(0.15);
  const [breakTime, setBreakTime] = useState(0.25);
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
  const [showCenterContainer, setShowCenterContainer] = useState(false);

  const showCenterContainerTimeout = () => {
    setShowCenterContainer(true);
    setTimeout(() => {
      setShowCenterContainer(false);
    }, 3000);
  };

  useEffect(() => {
    if (currentRound >= rounds) return stop();
    if (pomodoroPhase !== "none") {
      showCenterContainerTimeout();
      if (pomodoroPhase === "work" && currentRound !== 0) {
        const workSound = new Audio("/sounds/alert_work.mp3");
        workSound.currentTime = 0;
        workSound.play();
      }

      if (pomodoroPhase === "break") {
        const breakSound = new Audio("/sounds/alert_break.mp3");
        breakSound.currentTime = 0;
        breakSound.play();
      }

      return setIsRunning(true);
    }
  }, [pomodoroPhase, currentRound, rounds, setIsRunning, stop]);

  if (pomodoroPhase !== "none") {
    return (
      <div className="pointer-events-none fixed left-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-between px-5 py-8">
        <div className="flex w-full justify-between">
          <div className="mx-10 w-fit rounded border-4 border-violet-700 bg-orangeFlavour px-4 py-2 text-4xl font-bold text-violet-700">
            {isRunning && (
              <CountdownClock
                startTime={startTime}
                minutes={pomodoroPhase === "work" ? workTime : breakTime}
              />
            )}
          </div>
          <div className="mx-10 w-fit rounded border-4 border-violet-700 bg-orangeFlavour px-4 py-2 text-2xl font-bold capitalize text-violet-700">
            <span>
              {pomodoroPhase} Round {currentRound + 1} / {rounds}
            </span>
          </div>
        </div>

        {showCenterContainer && (
          <div className="w-fit animate-pulse rounded border-6 border-violet-700 bg-orangeFlavour px-4 py-12 text-5xl font-bold capitalize text-violet-700">
            {pomodoroPhase} Time!
          </div>
        )}

        <button
          className="pointer-events-auto w-fit rounded border-4 border-violet-700 bg-orangeFlavour px-4 py-2 text-2xl font-bold text-violet-700 hover:bg-orange-400"
          onClick={() => {
            stop();
          }}
        >
          Stop
        </button>
      </div>
    );
  } else {
    return (
      <div className="fixed left-0 top-0 z-10 flex aspect-square h-screen min-h-160 w-full flex-col items-center justify-between bg-orange-circle-gradient from-transparent from-25% to-orangeFlavour to-25% px-5 py-8 max-sm:from-30% max-sm:to-30% 2xl:from-20% 2xl:to-20%">
        <div className="h-max w-max">
          <div className="text-1xl text-center font-bold">
            <span>Total session length is {(workTime + breakTime) * roundsAmount} minutes.</span>
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
        <WorkTimeInput
          onWorkTimeSelected={(minutes: number) => {
            setWorkTime(minutes);
          }}
        />
        <div className="flex h-max w-full flex-row items-end justify-around max-sm:justify-between">
          <div className="flex w-fit flex-col items-center gap-2 rounded border-4 border-violet-700 bg-orangeFlavour px-4 py-4 text-2xl font-bold text-violet-700 max-sm:text-lg">
            <span>Break for {breakTime} minutes</span>
            <input
              className="w-64 accent-violet-700 max-sm:w-fit"
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
          <div className="flex w-fit flex-col items-center gap-2 rounded border-4 border-violet-700 bg-orangeFlavour px-4 py-4 text-2xl font-bold text-violet-700 max-sm:text-lg">
            <span>Do {roundsAmount} rounds</span>
            <input
              className="w-64 accent-violet-700 max-sm:w-fit"
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
  }
};

export default TimeInterface;
