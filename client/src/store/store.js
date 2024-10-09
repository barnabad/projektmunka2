import { create } from "zustand";
import { createUserSlice } from "./usersSlice";
import { createGameSlice } from "./gameSlice";

export const useStore = create((...a) => ({
  ...createUserSlice(...a),
  ...createGameSlice(...a),
}));
