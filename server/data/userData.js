// Felhasználók adatainak tárolása a memóriában
const UsersData = {
  users: [],
  setUsers: function (newUsersArray) {
    this.users = newUsersArray;
  },
};

export function createUser(id, name, score) {
  const user = { id, name, score };
  UsersData.setUsers([...UsersData.users.filter((user) => user.id !== id), user]);
  return user;
}

export function removeUser(id) {
  UsersData.setUsers(UsersData.users.filter((user) => user.id !== id));
}

export function getUser(id) {
  return UsersData.users.find((user) => user.id === id);
}

export function setScore(id) {
  const name = getUser(id).name;
  const user = { id, name, score };
  UsersData.setUsers([...UsersData.users.filter((user) => user.id !== id), user]);
}
