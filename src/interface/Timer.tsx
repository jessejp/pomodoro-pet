import React, { useState, useEffect, useRef } from "react";
import { usePomodoro } from "../store/usePomodoro";

const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const {
    start,
    stop,
    nextRound,
    currentRound,
    rounds,
    pomodoroPhase,
    startTime,
  } = usePomodoro();
  const timerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let intervalId: number | undefined;

    if (pomodoroPhase === "work" && timerRef.current) {
      timerRef.current.innerText = `${minutes}:00`;
      intervalId = setInterval(() => {
        // Calculate the elapsed time
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);

        const timeLeft = 60 * minutes - elapsedTime;

        const elapsedMinutes = Math.floor(timeLeft / 60);
        const elapsedSeconds = timeLeft % 60;

        console.log(elapsedTime, timeLeft, elapsedMinutes, elapsedSeconds);

        if (timerRef.current)
          timerRef.current.innerText = `${elapsedMinutes}:${
            elapsedSeconds < 10 ? "0" : ""
          }${elapsedSeconds}`;

        console.log(
          `${elapsedMinutes}:${elapsedSeconds < 10 ? "0" : ""}${elapsedSeconds}`
        );

        if (elapsedTime >= 60 * minutes) {
          // 25 minutes have passed
          console.log("timer passed", currentRound, rounds);

          if (currentRound >= rounds) stop();
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [pomodoroPhase, startTime, stop, currentRound, rounds, minutes]);

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
              start({ rounds: 1 });
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
