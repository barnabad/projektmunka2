// Felhasználók adatainak tárolása a memóriában
const UsersData = {
  users: [],
  setUsers: function (newUsersArray) {
    this.users = newUsersArray;
  },
};

export function activateUser(id, name, room) {
  const user = { id, name, room };
  UsersData.setUsers([...UsersData.users.filter((user) => user.id !== id), user]);
  return user;
}

export function userLeavesApp(id) {
  UsersData.setUsers(UsersData.users.filter((user) => user.id !== id));
}

export function getUser(id) {
  return UsersData.users.find((user) => user.id === id);
}

export function getUsersInRoom(room) {
  return UsersData.users.filter((user) => user.room === room);
}

export function getAllActiveRooms() {
  return Array.from(new Set(UsersData.users.map((user) => user.room)));
}