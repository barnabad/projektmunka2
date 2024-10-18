import { create } from "zustand";
import { createUserSlice } from "./usersSlice";
import { createGameSlice } from "./gameSlice";
import { createCanvasSlice } from "./canvasSlice";

export const useStore = create((...a) => ({
  ...createUserSlice(...a),
  ...createGameSlice(...a),
  ...createCanvasSlice(...a),
}));
