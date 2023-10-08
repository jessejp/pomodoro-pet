import type { StateCreator } from "zustand";
import type { SessionLogParams } from "../types";

export const SessionLogSlice: StateCreator<SessionLogParams> = (set) => {
  return {
    selectedTaskIndex: -1,
    newTaskMessage: null,
    sessionLog: [],
    updateSessionLog: (logEntry) => {
      set(({ sessionLog, selectedTaskIndex, newTaskMessage }) => {
        if (selectedTaskIndex === -1) {
          return {
            newTaskMessage: null,
            selectedTaskIndex: 0,
            sessionLog: [
              {
                message: newTaskMessage || "Unnamed Task",
                minutes: logEntry.minutes,
                minutesWithBreaks: logEntry.minutesWithBreaks,
              },
              ...sessionLog,
            ],
          };
        } else if (sessionLog.length) {
          return {
            newTaskMessage: null,
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
