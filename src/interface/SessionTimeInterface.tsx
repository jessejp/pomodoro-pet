import { useState, useEffect } from "react";
import { usePomodoro } from "../utils/usePomodoro";
import CountdownClock from "./timer/CountdownClock";
import WorkTimeInput from "./timer/WorkTimeInput";

const TimeInterface = () => {
  const [workTime, setWorkTime] = useState(0.15);
  const [breakTime, setBreakTime] = useState(0.25);
  const [roundsAmount, setRoundsAmount] = useState(1);
  const {
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
  }, [pomodoroPhase, currentRound, rounds, setIsRunning, stop]);

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
};

export default TimeInterface;
