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

export type PetType = "monkey" | "penguin";

export type PetMeshType = {
  monkey: THREE.SkinnedMesh;
  penguin: THREE.SkinnedMesh;
};

export type EquippedCosmetic = {
  petModel: PetType;
  cosmetics: CosmeticItem[];
};

export interface CosmeticParams {
  equippedCosmetic: EquippedCosmetic;
  updatePetModel: (pet: PetType) => void;
  updateCosmetic: (cosmetics: EquippedCosmetic) => void;
}

/* 
┏┓┏┓┏┓┏┓┳┏┓┳┓  ┓ ┏┓┏┓
┗┓┣ ┗┓┗┓┃┃┃┃┃  ┃ ┃┃┃┓
┗┛┗┛┗┛┗┛┻┗┛┛┗  ┗┛┗┛┗┛
*/

export type Log = {
  task: string;
  taskTimeSeconds: number;
};

export interface SessionLogParams {
  sessionLog: Log[];
  createLog: (logEntry: Log) => void;
  updateSessionLog: (logEntry: Log) => void;
}