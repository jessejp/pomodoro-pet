import { create } from "zustand";

interface PomodoroState {
  startTime: number;
  workTime: number;
  rounds: number;
  currentRound: number;
  pomodoroPhase: "work" | "break" | "longBreak" | "none";
  start: (params: { rounds: number }) => void;
  stop: () => void;
  addRound: () => void;
}

export const usePomodoro = create<PomodoroState>((set) => {
  return {
    startTime: 0,
    workTime: 0,
    rounds: 1,
    currentRound: 0,
    pomodoroPhase: "none",

    start: ({ rounds }) =>
      set(() => {
        return {
          pomodoroPhase: "work",
          startTime: Date.now(),
          currentRound: 1,
          rounds,
        };
      }),
    stop: () => set(() => ({ pomodoroPhase: "none" })),
    addRound: () =>
      set(({ currentRound }) => ({ currentRound: currentRound + 1 })),
  };
});
