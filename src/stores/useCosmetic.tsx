import { create } from "zustand";

export type HeadSlot = "beanie" | undefined;

type Pet = "monkey";

interface Cosmetic {
  pet_model: Pet;
  head_slot: HeadSlot;
}

interface CosmeticStore {
  cosmetic: Cosmetic;
  updateCosmetic: (cosmetic: Cosmetic) => void;
}

export const useCosmetic = create<CosmeticStore>((set) => {
  return {
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
  };
});
