import React, { useState, useEffect, useRef } from "react";
import { usePomodoro } from "../store/usePomodoro";
import getTimer from "../store/getTimer";

const Timer = () => {
  const [minutes, setMinutes] = useState(0.1);
  const {
    start,
    stop,
    startBreak,
    nextRound,
    currentRound,
    rounds,
    pomodoroPhase,
    pomodoroSession,
    startTime,
  } = usePomodoro();

  const timerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let intervalId: number | undefined;
    console.log("effect", pomodoroPhase);

    if (currentRound >= rounds) return stop();

    if (
      pomodoroPhase === "work" &&
      !!pomodoroSession?.length &&
      timerRef.current
    ) {
      const { workTime } = pomodoroSession[currentRound];
      timerRef.current.innerText = `${workTime}:00`;
      intervalId = setInterval(() => {
        // Calculate the elapsed time
        const { elapsedTime, elapsedMinutes, elapsedSeconds } = getTimer({
          startTime,
          minutes: workTime,
        });

        if (timerRef.current)
          timerRef.current.innerText = `${elapsedMinutes}:${
            elapsedSeconds < 10 ? "0" : ""
          }${elapsedSeconds}`;

        console.log(
          "interval",
          `${elapsedMinutes}:${elapsedSeconds < 10 ? "0" : ""}${elapsedSeconds}`
        );

        if (elapsedTime >= 60 * workTime) {
          // timer round has passed
          startBreak();
        }
      }, 1000);
    } else if (
      pomodoroPhase === "break" &&
      !!pomodoroSession?.length &&
      timerRef.current
    ) {
      const { breakTime } = pomodoroSession[currentRound];
      timerRef.current.innerText = `${breakTime}:00`;
      intervalId = setInterval(() => {
        // Calculate the elapsed time
        const { elapsedTime, elapsedMinutes, elapsedSeconds } = getTimer({
          startTime,
          minutes: breakTime,
        });

        if (timerRef.current)
          timerRef.current.innerText = `${elapsedMinutes}:${
            elapsedSeconds < 10 ? "0" : ""
          }${elapsedSeconds}`;

        console.log(
          "interval",
          `${elapsedMinutes}:${elapsedSeconds < 10 ? "0" : ""}${elapsedSeconds}`
        );

        if (elapsedTime >= 60 * breakTime) {
          // timer round has passed
          nextRound();
        }
      }, 1000);
    }

    return () => {
      console.log("clearing interval");

      clearInterval(intervalId);
    };
  }, [
    stop,
    nextRound,
    startBreak,
    pomodoroPhase,
    startTime,
    currentRound,
    rounds,
    pomodoroSession,
    minutes,
  ]);

  return (
    <div className="fixed w-full z-10 bottom-1/2">
      <div className="text-5xl font-bold text-center" ref={timerRef}>
        0:00
      </div>
      <div className="mt-4" />
      {pomodoroPhase === "none" && (
        <div className="flex flex-col justify-center items-center gap-4">
          <input
            className="w-64"
            type="range"
            min={5}
            max={60}
            step={5}
            value={minutes}
            onChange={(e) => {
              setMinutes(e.target.valueAsNumber);
            }}
          />

          <button
            className="bg-pink-300 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              start({ rounds: 1, minutes });
            }}
          >
            Start {minutes} minutes
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
