import { create } from "zustand";

interface PomodoroState {
  startTime: number;
  pomodoroSession: { workTime: number; breakTime: number }[] | null;
  rounds: number;
  currentRound: number;
  pomodoroPhase: "work" | "break" | "longBreak" | "none";
  start: (params: {
    rounds: number;
    workMinutes: number;
    breakMinutes: number;
  }) => void;
  stop: () => void;
  startBreak: () => void;
  nextRound: () => void;
}

export const usePomodoro = create<PomodoroState>((set) => {
  return {
    startTime: 0,
    pomodoroSession: null,
    rounds: 0,
    currentRound: 0,
    pomodoroPhase: "none",

    start: ({ rounds, workMinutes, breakMinutes }) =>
      set(() => {
        const pomodoroSession = [];
        for (let i = 0; i < rounds; i++) {
          pomodoroSession.push({
            workTime: workMinutes,
            breakTime: breakMinutes,
          });
        }

        console.log(pomodoroSession);

        return {
          pomodoroSession,
          pomodoroPhase: "work",
          startTime: Date.now(),
          currentRound: 0,
          rounds,
        };
      }),
    stop: () => set(() => ({ pomodoroPhase: "none" })),
    startBreak: () => set(() => ({ pomodoroPhase: "break", startTime: Date.now() })),
    nextRound: () =>
      set(({ currentRound }) => {
        console.log("next round");

        return { currentRound: currentRound + 1, pomodoroPhase: "work", startTime: Date.now() };
      }),
  };
});
