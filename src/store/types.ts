/*
    Pomodoro Time Slice Types
*/
export interface PomodoroTimerParams {
  isModelLoaded: boolean;
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
  modelLoaded: () => void;
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
  updateCosmetic: (cosmetic: Cosmetic) => void;
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
  newTaskMessage: string | null;
  sessionLog: Log[];
  updateSessionLog: (logEntry: Log) => void;
  updateSelectedTaskIndex: (selectedIndex: number) => void;
  updateNewTaskMessage: (value: string | null) => void;
}
