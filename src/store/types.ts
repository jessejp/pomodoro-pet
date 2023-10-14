/*
    Pomodoro Time Slice Types
*/
export interface PomodoroTimerParams {
  isRunning: boolean;
  startTime: number;
  pomodoroSession: { workTime: number; breakTime: number }[] | null;
  rounds: number;
  currentRound: number;
  pomodoroPhase: "work" | "break" | "none";
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

/* 
    Cosmetic Slice Types
*/
export type HeadSlot = "beanie" | undefined;

export type Pet = "monkey";

export type Cosmetic = {
  pet_model: Pet;
  head_slot: HeadSlot;
};

export interface CosmeticParams {
  cosmetic: Cosmetic;
  isModelLoaded: boolean;
  updateCosmetic: (cosmetic: Cosmetic) => void;
  modelLoaded: () => void;
}

/* 
    Session Log Slice Types
*/

export type Log = {
  message: string | null;
  minutes: number;
  minutesWithBreaks: number;
};

export interface SessionLogParams {
  selectedTaskIndex: number;
  newTaskMessage: string;
  sessionLog: Log[];
  updateSessionLog: (logEntry: Log) => void;
  updateSelectedTaskIndex: (selectedIndex: number) => void;
  updateNewTaskMessage: (value: string) => void;
}
