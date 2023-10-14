import type { StateCreator } from "zustand";
import type { SessionLogParams } from "../types";

export const SessionLogSlice: StateCreator<SessionLogParams> = (set) => {
  return {
    selectedTaskIndex: -1,
    newTaskMessage: "",
    sessionLog: [],
    updateSessionLog: (logEntry) => {
      set(({ sessionLog, selectedTaskIndex, newTaskMessage }) => {
        if (selectedTaskIndex === -1 && !!newTaskMessage) {
          return {
            sessionLog: [
              {
                message: newTaskMessage || "Unnamed Task",
                minutes: logEntry.minutes,
                minutesWithBreaks: logEntry.minutesWithBreaks,
              },
              ...sessionLog,
            ],
            newTaskMessage: "",
            selectedTaskIndex: 0,
          };
        } else if (sessionLog.length) {
          return {
            newTaskMessage: "",
            sessionLog: sessionLog.map((log, index) => {
              if (selectedTaskIndex !== index) return log;
              else
                return {
                  message: log.message,
                  minutes: log.minutes + logEntry.minutes,
                  minutesWithBreaks:
                    log.minutesWithBreaks + logEntry.minutesWithBreaks,
                };
            }),
          };
        } else {
          return {
            sessionLog: [
              {
                message: "Unnamed Task",
                minutes: logEntry.minutes,
                minutesWithBreaks: logEntry.minutesWithBreaks,
              },
            ],
            selectedTaskIndex: 0,
          };
        }
      });
    },
    updateSelectedTaskIndex: (selectedIndex) => {
      set(() => {
        return {
          selectedTaskIndex: selectedIndex,
        };
      });
    },
    updateNewTaskMessage: (value) => {
      set(() => {
        return {
          newTaskMessage: value,
        };
      });
    },
  };
};
