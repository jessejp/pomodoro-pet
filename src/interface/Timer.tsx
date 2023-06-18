import React, { useState, useEffect, useRef } from "react";
import { usePomodoro } from "../store/usePomodoro";

const Timer = () => {
  const [minutes, setMinutes] = useState(0.1);
  const { start, stop, addRound, currentRound, rounds, isRunning, startTime } =
    usePomodoro();
  const timerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let intervalId: number | undefined;

    if (isRunning) {
      timerRef.current!.innerText = "0:00";
      intervalId = setInterval(() => {
        // Calculate the elapsed time
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        console.log(elapsedTime);
        const seconds = elapsedTime % 60;
        timerRef.current!.innerText = `${Math.floor(elapsedTime / 60)}:${
          seconds < 10 ? "0" : ""
        }${seconds}`;
        if (elapsedTime >= 60 * minutes) {
          // 25 minutes have passed
          console.log("timer passed", currentRound, rounds);
          if (currentRound >= rounds) stop();
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, startTime, stop]);

  console.log("dom rendered");

  return (
    <>
      <div className="text-5xl font-bold text-center" ref={timerRef}>
        0:00
      </div>
      <div className="mt-4" />
      {!isRunning && (
        <button
          className="bg-pink-300 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            start({ rounds: 1 });
            addRound();
          }}
        >
          Start {minutes} minutes
        </button>
      )}
      {!!isRunning && (
        <button
          className="bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            stop();
          }}
        >
          Stop
        </button>
      )}
    </>
  );
};

export default Timer;
