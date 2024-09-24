import {
  activateUser,
  userLeavesApp,
  getUser,
  getUsersInRoom,
  getAllActiveRooms,
} from '../data/userData.js';

export function drawSocket(socket) {
  socket.on('draw', (data) => listenOnDraw(socket, data));
}

function listenOnDraw(socket, data) {
  // TODO!
  // Rajz feldolgozása...
  console.log(getUser(socket.id));
  // TODO!
  // Rajz kiküldése
}
