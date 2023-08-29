import React, { useEffect, useState } from "react";
import formatTime from "../../utils/formatTime";
import { usePomodoro } from "../../utils/usePomodoro";
import getElapsedTime from "../../utils/getElapsedTime";
import { useSessionLog } from "../../utils/useSessionLog";

interface Props {
  startTime: number;
  minutes: number;
}

const CountdownClock: React.FC<Props> = ({ startTime, minutes }) => {
  const { newTaskMessage, updateSessionLog } =
    useSessionLog();
  const {
    pomodoroPhase,
    pomodoroSession,
    currentRound,
    startBreak,
    nextRound,
    setIsRunning,
  } = usePomodoro();
  const [timeRemaining, setTimeRemaining] = useState(minutes * 60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const { timeLeft } = getElapsedTime({
        startTime,
        minutes,
      });

      if (timeLeft <= 0) {
        setIsRunning(false);
        // timer round has passed
        if (pomodoroPhase === "work") {
          if (pomodoroSession !== null)
            updateSessionLog({
              message: newTaskMessage,
              minutes: pomodoroSession[currentRound].workTime,
              minutesWithBreaks: pomodoroSession[currentRound].workTime,
            });
          startBreak();
        } else if (pomodoroPhase === "break") {
          if (pomodoroSession !== null)
            updateSessionLog({
              message: newTaskMessage,
              minutes: 0,
              minutesWithBreaks: pomodoroSession[currentRound].breakTime,
            });
          nextRound();
        }
      } else {
        // timerRef.current!.innerText = formatTime(timeLeft);
        setTimeRemaining(timeLeft);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return <span>{formatTime(timeRemaining)}</span>;
};

export default CountdownClock;
