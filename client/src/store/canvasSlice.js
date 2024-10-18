export const createCanvasSlice = (set) => ({
  canvasWidth: 0,
  canvasHeight: 0,
  color: "#000000",
  thickness: 8,
  ctx: null,

  setCanvasWidth: (value) => set({ canvasWidth: value }),
  setCanvasHeight: (value) => set({ canvasHeight: value }),
  setColor: (value) => set({ color: value }),
  setThickness: (value) => set({ thickness: value }),
  setCtx: (value) => set({ ctx: value }),
});
