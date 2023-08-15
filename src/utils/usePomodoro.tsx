import { create } from "zustand";

interface PomodoroState {
  startTime: number;
  pomodoroSession: { workTime: number; breakTime: number }[] | null;
  rounds: number;
  currentRound: number;
  pomodoroPhase: "work" | "break" | "none";
  isRunning: boolean;
  start: (params: {
    rounds: number;
    workTime: number;
    breakTime: number;
  }) => void;
  stop: () => void;
  startBreak: () => void;
  nextRound: () => void;
  setIsRunning: (newState: boolean) => void;
}

export const usePomodoro = create<PomodoroState>((set) => {
  return {
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
    startBreak: () => {
      const breakSound = new Audio("/sounds/alert_break.mp3");
      breakSound.currentTime = 0;
      breakSound.play();

      new Notification("Break time!", {
        body: "Take a break to freshen up!",
        silent: true,
      });

      set(() => ({ pomodoroPhase: "break", startTime: Date.now() }));
    },
    nextRound: () => {
      const workSound = new Audio("/sounds/alert_work.mp3");
      workSound.currentTime = 0;
      workSound.play();

      new Notification("Time to continue the session!", {
        body: "Let's focus now!",
        silent: true,
      });

      set(({ currentRound }) => {
        return {
          currentRound: currentRound + 1,
          pomodoroPhase: "work",
          startTime: Date.now(),
        };
      });
    },
    setIsRunning: (newState: boolean) => {
      set(() => ({ isRunning: newState }));
    },
  };
});
