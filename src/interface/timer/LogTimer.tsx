import type { Row } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import type { Log } from "../../store/types";
import { formatTimeVerbose } from "../../utils/formatTime";

interface LogTimerProps {
  initialSeconds: number;
  row: Row<Log>;
  handleDismount: (sec: number, activeRow: Row<Log>) => void;
}

export const LogTimer: React.FC<LogTimerProps> = ({
  initialSeconds,
  handleDismount,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("tick");
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
      console.log("Save To Zustand?");
    };
  }, [handleDismount]);

  return formatTimeVerbose(seconds);
};
