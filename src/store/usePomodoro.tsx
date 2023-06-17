import { create } from "zustand";

export const usePomodoro = create((set) => {
  return {
    timer: 0,
    
  };
});
