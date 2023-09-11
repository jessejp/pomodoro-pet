import { useState, useEffect } from "react";
import { usePomodoro } from "../utils/usePomodoro";
import CountdownClock from "./timer/CountdownClock";
import WorkTimeInput from "./timer/WorkTimeInput";

const TimeInterface = () => {
  const {
    stop,
    setIsRunning,
    pomodoroSession,
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
    <div className="pointer-events-none fixed w-full z-10 flex justify-center">
      <div className="relative top-4 flex w-11/12 justify-between gap-2">
        <div className="w-fit self-baseline rounded border-4 border-violet-700 bg-orangeFlavour px-4 py-2 text-4xl font-bold text-violet-700">
          {isRunning && pomodoroSession?.length && (
            <CountdownClock
              startTime={startTime}
              minutes={
                pomodoroPhase === "work"
                  ? pomodoroSession[currentRound].workTime
                  : pomodoroSession[currentRound].breakTime
              }
            />
          )}
        </div>
        <div className="w-fit rounded border-4 border-violet-700 bg-orangeFlavour px-4 py-2 text-2xl font-bold capitalize text-violet-700">
          <span>{pomodoroPhase}&nbsp;Round</span>{" "}
          <span className="whitespace-nowrap">
            {currentRound + 1} / {rounds}
          </span>
        </div>
      </div>

      {showCenterContainer && (
        <div className="fixed top-1/4 z-10 w-full">
          <div className="mx-auto w-fit animate-pulse rounded border-6 border-violet-700 bg-orangeFlavour px-4 py-12 text-5xl font-bold capitalize text-violet-700">
            {pomodoroPhase} Time!
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeInterface;
