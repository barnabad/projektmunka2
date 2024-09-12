import { create } from "zustand";
import { players, messages, solution } from "../testData";

const useStore = create((set) => ({
  // Initial states
  players: players,
  time: 99,
  gameState: "",
  currentWord: solution,
  round: 1,
  drawingPlayer: null,
  messages: messages,

  // Actions
  addPlayer: (player) =>
    set((state) => ({ players: [...state.players, player] })),

  removePlayer: (playerId) =>
    set((state) => ({
      players: state.players.filter((player) => player.id !== playerId),
    })),

  setGameState: (newState) => set({ gameState: newState }),

  //setCurrentWord: (word) => set({ currentWord: word }),

  //setDrawingPlayer: (player) => set({ drawingPlayer: player }),

  addMessage: (word) =>
    set((state) => ({ messages: [...state.messages, word] })),

  nextRound: () => set((state) => ({ round: state.round + 1 })),
}));

export default useStore;
