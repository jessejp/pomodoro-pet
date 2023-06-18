import { create } from "zustand";

interface PomodoroState {
  startTime: number;
  workTime: number;
  rounds: number;
  currentRound: number;
  isRunning: boolean;
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
    isRunning: false,

    start: ({ rounds }) =>
      set(() => {
        console.log(rounds);

        return {
          isRunning: true,
          startTime: Date.now(),
          currentRound: 0,
          rounds,
        };
      }),
    stop: () => set(() => ({ isRunning: false })),
    addRound: () =>
      set(({ currentRound }) => ({ currentRound: currentRound + 1 })),
  };
});
