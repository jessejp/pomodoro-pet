import { type StateCreator } from "zustand";
import type { CosmeticParams } from "../types";

export const PetCosmeticSlice: StateCreator<CosmeticParams> = (set) => ({
  equippedCosmetic: {
    petModel: "monkey",
    cosmetics: [],
  },
  updatePetModel: (pet) => {
    set((state) => {
      return {
        equippedCosmetic: {
          ...state.equippedCosmetic,
          petModel: pet,
        },
      };
    });
  },
  updateCosmetic: (newCosmetic) => {
    set((state) => {
      return {
        equippedCosmetic: {
          ...state.equippedCosmetic,
          ...newCosmetic,
        },
      };
    });
  },
});
