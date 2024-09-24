export const createUserSlice = (set) => ({
  users: [
    /*{ id: 1, name: "Barni", points: 3000, isDrawing: true },
    { id: 2, name: "Alex", points: 8000, isDrawing: false },
    { id: 3, name: "Marci", points: 4000, isDrawing: false },
    { id: 5, name: "Jakab", points: 30, isDrawing: false },
    { id: 4, name: "Peti", points: 5575, isDrawing: false },*/
  ],
  addUser: (newUser) => set((state) => ({ users: [...state.users, newUser] })),
  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((item) => item.id !== id),
    })),
  sortUsers: () =>
    set((state) => ({
      users: [...state.users].sort((a, b) => b.points - a.points),
    })),
});
