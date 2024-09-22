// UsersState class to encapsulate user state management
class UsersState {
  constructor() {
    this.users = [];
  }

  setUsers(newUsersArray) {
    this.users = newUsersArray;
  }

  activateUser(id, name, room) {
    const user = { id, name, room };
    this.setUsers([
      ...this.users.filter((user) => user.id !== id),
      user,
    ]);
    return user;
  }

  userLeavesApp(id) {
    this.setUsers(this.users.filter((user) => user.id !== id));
  }

  getUser(id) {
    return this.users.find((user) => user.id === id);
  }

  getUsersInRoom(room) {
    return this.users.filter((user) => user.room === room);
  }

  getAllActiveRooms() {
    return Array.from(new Set(this.users.map((user) => user.room)));
  }
}

const usersState = new UsersState();

export function activateUser(id, name, room) {
  return usersState.activateUser(id, name, room);
}

export function userLeavesApp(id) {
  usersState.userLeavesApp(id);
}

export function getUser(id) {
  return usersState.getUser(id);
}

export function getUsersInRoom(room) {
  return usersState.getUsersInRoom(room);
}

export function getAllActiveRooms() {
  return usersState.getAllActiveRooms();
}