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
}) => {
  const saveChangesRef = useRef(false);
  const [seconds, setSeconds] = useState(initialSeconds);
  console.log("LogTimer Component Rendered", rowId);

  const dismount = useCallback(() => {
    console.log("hello useCallback, we should be dismounting");
    console.log("is this old info tho?", seconds, rowId);
    // handleDismount(seconds, rowId);
  }, [seconds, rowId]);

  useEffect(() => {
    if (!isSelected) {
      console.log("if !isSelected");
      return;
    }

    const interval = setInterval(() => {
      console.log("tick");
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      console.log("ticker useEffect, cleanup");

      clearInterval(interval);
    };
  }, [isSelected, saveChangesRef]);

  useEffect(() => {
    console.log("hello dismount effect", saveChangesRef.current);

    console.log("SaveChanges === TRUE");

    return () => {
      console.log("Save To Zustand?");
      dismount();
    };
  }, [dismount]);

  return formatTimeVerbose(seconds);
};
