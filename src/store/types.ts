/*
┏┓┏┓┳┳┓┏┓┳┓┏┓┳┓┏┓  ┏┳┓┳┳┳┓┏┓┳┓
┃┃┃┃┃┃┃┃┃┃┃┃┃┣┫┃┃   ┃ ┃┃┃┃┣ ┣┫
┣┛┗┛┛ ┗┗┛┻┛┗┛┛┗┗┛   ┻ ┻┛ ┗┗┛┛┗
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
┏┓┓┏┏┓┳┓┏┓┏┓┏┳┓┏┓┳┓
┃ ┣┫┣┫┣┫┣┫┃  ┃ ┣ ┣┫
┗┛┛┗┛┗┛┗┛┗┗┛ ┻ ┗┛┛┗
*/

export type CosmeticSlots = "head";

export type HeadSlot = "beanie" | undefined;

export type CosmeticItem = {
  name: HeadSlot;
  slot: CosmeticSlots;
};

export type Pet = "monkey";

export type EquippedCosmetic = {
  petModel: Pet;
  cosmetics: CosmeticItem[];
};

export interface CosmeticParams {
  equippedCosmetic: EquippedCosmetic;
  isModelLoaded: boolean;
  updateCosmetic: (cosmetics: EquippedCosmetic) => void;
  modelLoaded: () => void;
}

/* 
┏┓┏┓┏┓┏┓┳┏┓┳┓  ┓ ┏┓┏┓
┗┓┣ ┗┓┗┓┃┃┃┃┃  ┃ ┃┃┃┓
┗┛┗┛┗┛┗┛┻┗┛┛┗  ┗┛┗┛┗┛
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
