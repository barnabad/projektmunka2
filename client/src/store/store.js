import { create } from "zustand";
import { createUserSlice } from "./usersSlice";

export const useStore = create((...a) => ({
  ...createUserSlice(...a),
}));
