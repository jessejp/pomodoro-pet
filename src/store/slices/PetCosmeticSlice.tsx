import { type StateCreator } from "zustand";
import type { CosmeticParams } from "../types";

export const PetCosmeticSlice: StateCreator<CosmeticParams> = (set) => ({
  cosmetic: {
    pet_model: "monkey",
    head_slot: undefined,
  },
  updateCosmetic: (cosmetic) => {
    set((state) => {
      return {
        cosmetic: {
          ...state.cosmetic,
          ...cosmetic,
        },
      };
    });
  },
});
