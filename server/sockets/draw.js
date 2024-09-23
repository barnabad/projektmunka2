import {
  activateUser,
  userLeavesApp,
  getUser,
  getUsersInRoom,
  getAllActiveRooms,
} from '../states/usersState.js';

export function onDrawSocket(socket) {
  socket.on('draw', (data) => listenOnDraw(socket, data));
}

function listenOnDraw(socket, data) {
  // Rajz feldolgozása...
  // TODO!

  console.log(socket.id);

  // Felhasználói adatok
  const user = getUser(socket.id);
  const room = user?.room;

  console.log(user);

  // Rajz kiküldése
  //if (room) socket.broadcast.to(room).emit('draw', data);
}
