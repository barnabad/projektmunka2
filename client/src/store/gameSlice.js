export const createGameSlice = (set) => ({
  players: [],
  gameState: "preGame", // "preGame | choosing | playing | roundEnd | postGame"
  chatMessages: [],

  setPlayers: (players) => set({ players: players }),
  setGameState: (state) => set({ gameState: state }),
  setChatMessages: (newMsg) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, newMsg],
    })),
});
