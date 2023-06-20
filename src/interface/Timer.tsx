import React, { useState, useEffect, useRef } from "react";
import { usePomodoro } from "../store/usePomodoro";
import getTimer from "../store/getTimer";

const Timer = () => {
  const [workMinutes, setWorkMinutes] = useState(1);
  const [breakMinutes, setBreakMinutes] = useState(1);
  const [roundsAmount, setRoundsAmount] = useState(1);
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
    workMinutes,
  ]);

  return (
    <div className="fixed w-full z-10 bottom-1/2">
    <div className="text-3xl font-bold text-center capitalize" >
      {pomodoroPhase !== "none" && (<span>{pomodoroPhase} Round {currentRound+1}</span>)}
    </div>
      <div className="text-5xl font-bold text-center" ref={timerRef}>
        0:00
      </div>
      <div className="mt-4" />
      {pomodoroPhase === "none" && (
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col text-1xl font-bold text-center">
            <span>Work for {workMinutes} minutes</span>
            <input
              className="w-64"
              type="range"
              name="workMinutes"
              min={5}
              max={60}
              step={5}
              value={workMinutes}
              onChange={(e) => {
                setWorkMinutes(e.target.valueAsNumber);
              }}
            />
          </div>
          <div className="flex flex-col text-1xl font-bold text-center">
            <span>Break for {breakMinutes} minutes</span>
            <input
              className="w-64"
              type="range"
              name="breakMinutes"
              min={1}
              max={20}
              step={1}
              value={breakMinutes}
              onChange={(e) => {
                setBreakMinutes(e.target.valueAsNumber);
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
              start({ rounds: roundsAmount, workMinutes, breakMinutes });
            }}
          >
            Start {workMinutes} minutes
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
