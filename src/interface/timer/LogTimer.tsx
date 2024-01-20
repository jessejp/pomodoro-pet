import type { Row } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import type { Log } from "../../store/types";
import { formatTimeVerbose } from "../../utils/formatTime";

interface LogTimerProps {
  initialSeconds: number;
  rowId: Row<Log>["id"];
  isSelected: ReturnType<Row<Log>["getIsSelected"]>;
  handleDismount: (sec: number) => void;
}

export const LogTimer: React.FC<LogTimerProps> = ({
  initialSeconds,
  isSelected,
  rowId,
  handleDismount,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (!isSelected) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      handleDismount(seconds);
    };
  }, [isSelected, seconds, rowId, handleDismount]);

  return formatTimeVerbose(seconds);
};
