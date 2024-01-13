import { create } from "zustand";
import type {
  CosmeticParams,
  PomodoroTimerParams,
} from "./types";
import { PetCosmeticSlice } from "./slices/PetCosmeticSlice";
import { PomodoroTimerSlice } from "./slices/PomodoroTimerSlice";

export const useBoundStore = create<
  CosmeticParams & PomodoroTimerParams
>()((...a) => ({
  ...PomodoroTimerSlice(...a),
  ...PetCosmeticSlice(...a),
}));
