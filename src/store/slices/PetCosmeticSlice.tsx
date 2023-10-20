import { type StateCreator } from "zustand";
import type { CosmeticParams } from "../types";

export const PetCosmeticSlice: StateCreator<CosmeticParams> = (set) => ({
  equippedCosmetic: {
    petModel: "monkey",
    cosmetics: [],
  },
  isModelLoaded: false,
  modelLoaded: () => {
    set(() => {
      return { isModelLoaded: true };
    });
  },
  updateCosmetic: (cosmetics) => {
    set((state) => {
      return {
        equippedCosmetic: {
          ...state.equippedCosmetic,
          ...cosmetics,
        },
      };
    });
  },
});
