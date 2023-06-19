import { create } from "zustand";

interface PomodoroState {
  startTime: number;
  pomodoroSession: {workTime: number, breakTime: number} | null;
  rounds: number;
  currentRound: number;
  pomodoroPhase: "work" | "break" | "longBreak" | "none";
  start: (params: { rounds: number }) => void;
  stop: () => void;
  nextRound: () => void;
}

export const usePomodoro = create<PomodoroState>((set) => {
  return {
    startTime: 0,
    pomodoroSession: null,
    rounds: 0,
    currentRound: 0,
    pomodoroPhase: "none",

    start: ({ rounds }) =>
      set(() => {
        return {
          pomodoroSession: {workTime: 25, breakTime: 5},
          pomodoroPhase: "work",
          startTime: Date.now(),
          currentRound: 0,
          rounds,
        };
      }),
    stop: () => set(() => ({ pomodoroPhase: "none" })),
    nextRound: () =>
      set(({ currentRound }) => ({ currentRound: currentRound + 1 })),
  };
});
