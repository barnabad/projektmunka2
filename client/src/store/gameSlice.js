export const createGameSlice = (set) => ({
  players: [],
  gameState: "preGame", // "preGame | choosing | playing | roundEnd | postGame"
  chatMessages: [],
  wordOptions: [],
  drawerId: "",
  drawerName: "",

  setPlayers: (players) => set({ players: players }),
  setGameState: (state) => set({ gameState: state }),
  setChatMessages: (newMsg) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, newMsg],
    })),
  setWordOptions: (words) => set({ wordOptions: words }),
  setDrawerId: (id) => set({ drawerId: id }),
  setDrawerName: (name) => set({ drawerName: name }),
});
