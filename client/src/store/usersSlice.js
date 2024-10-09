export const createUserSlice = (set) => ({
  mySocketId: "",
  name: "",
  myRoomId: "",
  ownerId: "",

  setName: (name) => set({ name: name }),
  setMySocketId: (id) => set({ mySocketId: id }),
  setMyRoomId: (id) => set({ myRoomId: id }),
  setOwnerId: (id) => set({ ownerId: id }),
});
