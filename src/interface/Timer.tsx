import { useState, useEffect } from "react";
import { usePomodoro } from "../utils/usePomodoro";
import CountdownClock from "./CountdownClock";

const Timer = () => {
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

  return (
    <div className="fixed w-full z-10 bottom-1/2">
      <div className="text-3xl font-bold text-center capitalize">
        {pomodoroPhase !== "none" && (
          <span>
            {pomodoroPhase} Round {currentRound + 1} / {rounds}
          </span>
        )}
      </div>
      {pomodoroPhase !== "none" && isRunning && (
        <div className="text-5xl font-bold text-center">
          <CountdownClock startTime={startTime} minutes={workTime} />
        </div>
      )}
      <div className="mt-4" />
      {pomodoroPhase === "none" && (
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col text-1xl font-bold text-center">
            <span>Work for {workTime} minutes</span>
            <input
              className="w-64"
              type="range"
              name="workTime"
              min={5}
              max={60}
              step={5}
              value={workTime}
              onChange={(e) => {
                setworkTime(e.target.valueAsNumber);
              }}
            />
          </div>
          <div className="flex flex-col text-1xl font-bold text-center">
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
          <div className="flex flex-col text-1xl font-bold text-center">
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

          <button
            className="bg-pink-300 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              start({ rounds: roundsAmount, workTime, breakTime });
            }}
          >
            Start {workTime} minutes
          </button>
        </div>
      )}
      {pomodoroPhase !== "none" && (
        <button
          className="bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            stop();
          }}
        >
          Stop
        </button>
      )}
    </div>
  );
};

export default Timer;
