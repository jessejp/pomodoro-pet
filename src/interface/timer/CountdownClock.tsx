import React, { useEffect, useState } from "react";
import { formatTime } from "../../utils/formatTime";
import getElapsedTime from "../../utils/getElapsedTime";
import { useBoundStore } from "../../store/useBoundStore";

interface Props {
  startTime: number;
  minutes: number;
}

const CountdownClock: React.FC<Props> = ({ startTime, minutes }) => {
  const { pomodoroPhase, startBreak, nextRound, setIsRunning } = useBoundStore(
    (state) => ({
      pomodoroPhase: state.pomodoroPhase,
      pomodoroSession: state.pomodoroSession,
      currentRound: state.currentRound,
      startBreak: state.startBreak,
      nextRound: state.nextRound,
      setIsRunning: state.setIsRunning,
    })
  );

  const [timeRemaining, setTimeRemaining] = useState(minutes * 60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const { timeLeft } = getElapsedTime({
        startTime,
        minutes,
      });

      if (timeLeft <= 0) {
        setIsRunning(false);
        if (pomodoroPhase === "work") {
          startBreak();
        } else if (pomodoroPhase === "break") {
          nextRound();
        }
      } else {
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
