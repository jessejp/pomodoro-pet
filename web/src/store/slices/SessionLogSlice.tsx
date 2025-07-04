import { type StateCreator } from "zustand";
import type { SessionLogParams } from "../types";

export const SessionLogSlice: StateCreator<SessionLogParams> = (set) => ({
  sessionLog: [],
  createLog: (logEntry) => {
    set((state) => {
      return {
        sessionLog: [...state.sessionLog, logEntry],
      };
    });
  },
  updateSessionLog: ({ task, taskTimeSeconds }) => {
    set((state) => {
      return {
        sessionLog: state.sessionLog.map((log) => {
          if (log.task === task) return { task, taskTimeSeconds };
          return log;
        }),
      };
    });
  },
});
