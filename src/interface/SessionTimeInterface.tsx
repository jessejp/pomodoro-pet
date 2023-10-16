import { useState, useEffect } from "react";
import CountdownClock from "./timer/CountdownClock";
import { useBoundStore } from "../store/useBoundStore";
import clsx from "clsx";

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
  } = useBoundStore((state) => ({
    stop: state.stop,
    setIsRunning: state.setIsRunning,
    pomodoroSession: state.pomodoroSession,
    isRunning: state.isRunning,
    currentRound: state.currentRound,
    rounds: state.rounds,
    pomodoroPhase: state.pomodoroPhase,
    startTime: state.startTime,
  }));

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
    <div className="pointer-events-none fixed z-10 flex w-full items-start justify-center text-tertiary-900">
      <div className="relative top-10 flex w-full items-start justify-between gap-4 px-16 thin:flex-wrap-reverse thin:justify-center thin:px-4">
        <div
          className={clsx(
            "flex w-[7.75rem] items-center justify-center rounded-xl py-4 text-xl font-semibold leading-none",
            {
              "bg-primary-100": pomodoroPhase === "work",
              "bg-secondary-500": pomodoroPhase === "break",
            }
          )}
        >
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
        <div className="flex flex-wrap justify-evenly gap-2">
          {[...Array(rounds).keys()].map((n) => (
            <div
              key={n}
              className={clsx(
                "grid aspect-square h-16 w-16 place-content-center rounded-full text-lg font-semibold text-tertiary-900",
                {
                  "animate-pulsate-active-round-color":
                    n === currentRound && pomodoroPhase === "work",
                  "bg-secondary-500":
                    n === currentRound && pomodoroPhase === "break",
                  "bg-accent-500 ": n < currentRound,
                  "bg-cool-150": n > currentRound,
                }
              )}
            >
              {n + 1}
            </div>
          ))}
        </div>
      </div>

      {showCenterContainer && (
        <div className="fixed top-1/4 z-10 w-full">
          <div
            className={clsx(
              "mx-auto flex w-fit min-w-[24rem] animate-pulse flex-col rounded-xl p-4 text-center text-xl font-semibold capitalize",
              {
                "bg-primary-200": pomodoroPhase === "work",
                "bg-secondary-500": pomodoroPhase === "break",
              }
            )}
          >
            {pomodoroPhase} Time!
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeInterface;
