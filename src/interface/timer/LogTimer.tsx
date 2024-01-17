import type { Row } from "@tanstack/react-table";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Log } from "../../store/types";
import { formatTimeVerbose } from "../../utils/formatTime";

interface LogTimerProps {
  initialSeconds: number;
  rowId: Row<Log>["id"];
  isSelected: ReturnType<Row<Log>["getIsSelected"]>;
  handleDismount: (sec: number, activeRow: Row<Log>["id"]) => void;
}

export const LogTimer: React.FC<LogTimerProps> = ({
  initialSeconds,
  isSelected,
  rowId,
  handleDismount,
}) => {
  const saveChangesRef = useRef(false);
  const [seconds, setSeconds] = useState(initialSeconds);
  console.log("LogTimer Component Rendered", rowId);

  const dismount = useCallback(() => {
    console.log("hello useCallback, we should be dismounting");

    handleDismount(seconds, rowId);
  }, [seconds, rowId, handleDismount]);

  useEffect(() => {
    if (!isSelected) {
      console.log("if !isSelected");
      console.log(seconds, initialSeconds);
      return;
    } else if (isSelected && seconds === initialSeconds) {
      console.log('Timer just started');
    }

    const interval = setInterval(() => {
      console.log("tick");
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      console.log("ticker useEffect, but can we set ref here?");
      console.log("seconds changed", seconds > initialSeconds);

      clearInterval(interval);
    };
  }, [isSelected, saveChangesRef]);

  useEffect(() => {
    console.log("hello dismount effect", saveChangesRef.current);

    if (saveChangesRef.current === false) return;

    console.log("SaveChanges === TRUE");

    return () => {
      console.log("Save To Zustand?");
      dismount();
    };
  }, [dismount, saveChangesRef]);

  return formatTimeVerbose(seconds);
};
