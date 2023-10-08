import type { StateCreator } from "zustand";
import type { PomodoroTimerParams } from "../types";

export const PomodoroTimerSlice: StateCreator<PomodoroTimerParams> = (set) => ({
  isModelLoaded: false,
  startTime: 0,
  pomodoroSession: null,
  rounds: 0,
  currentRound: 0,
  pomodoroPhase: "none",
  isRunning: false,
  start: ({ rounds, workTime, breakTime }) =>
    set(() => {
      const pomodoroSession = [];
      for (let i = 0; i < rounds; i++) {
        pomodoroSession.push({
          workTime,
          breakTime,
        });
      }

      return {
        pomodoroSession,
        pomodoroPhase: "work",
        startTime: Date.now(),
        currentRound: 0,
        rounds,
      };
    }),
  stop: () => set(() => ({ pomodoroPhase: "none", isRunning: false })),
  startBreak: () =>
    set(() => ({ pomodoroPhase: "break", startTime: Date.now() })),
  nextRound: () =>
    set(({ currentRound }) => {
      return {
        currentRound: currentRound + 1,
        pomodoroPhase: "work",
        startTime: Date.now(),
      };
    }),
  setIsRunning: (newState: boolean) => {
    set(() => ({ isRunning: newState }));
  },
  modelLoaded: () => {
    set(() => {
      return { isModelLoaded: true };
    });
  },
});
