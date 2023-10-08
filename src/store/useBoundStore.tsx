import { create } from "zustand";
import type {
  CosmeticParams,
  PomodoroTimerParams,
  SessionLogParams,
} from "./types";
import { PetCosmeticSlice } from "./slices/PetCosmeticSlice";
import { PomodoroTimerSlice } from "./slices/PomodoroTimerSlice";
import { SessionLogSlice } from "./slices/SessionLogSlice";

export const useBoundStore = create<
  CosmeticParams & PomodoroTimerParams & SessionLogParams
>()((...a) => ({
  ...PomodoroTimerSlice(...a),
  ...PetCosmeticSlice(...a),
  ...SessionLogSlice(...a),
}));
