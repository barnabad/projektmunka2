export const createGameSlice = (set) => ({
  players: [],
  gameState: "preGame", // "preGame | choosing | playing | roundEnd | postGame"
  chatMessages: [],
  wordOptions: [],
  drawerId: "",
  drawerName: "",
  round: 0,
  maxRounds: 2,
  drawTime: 20,
  wordLength: 0,
  currentWord: "",
  chooseTime: 15,
  drawTimeLeft: 0,

  setPlayers: (players) => set({ players: players }),
  setGameState: (state) => set({ gameState: state }),
  setChatMessages: (newMsg) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, newMsg],
    })),
  setWordOptions: (words) => set({ wordOptions: words }),
  setDrawerId: (id) => set({ drawerId: id }),
  setDrawerName: (name) => set({ drawerName: name }),
  setRound: (value) => set({ round: value }),
  setMaxRounds: (value) => set({ maxRound: value }),
  setDrawTime: (value) => set({ drawTime: value }),
  setWordLength: (value) => set({ wordLength: value }),
  setCurrentWord: (value) => set({ currentWord: value }),
  setChooseTime: (value) => set({ chooseTime: value }),
  setDrawTimeLeft: (value) => set({ drawTimeLeft: value }),
  decreaseChooseTime: () =>
    set((state) => ({ chooseTime: state.chooseTime - 1 })),
  decreaseDrawTimeLeft: () =>
    set((state) => ({ drawTime: state.drawTimeLeft - 1 })),
});
