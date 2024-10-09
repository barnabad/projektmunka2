import { Server as SocketIoServer, Socket } from 'socket.io';
import { RoomContainer } from './setup.js';

export function gamePlaySocket(socket: Socket, ROOMS: RoomContainer) {
  socket.on('draw', (data) => listenOnDraw(socket));

  socket.on('startGame', (data) => startGame(socket));
}

function listenOnDraw(socket: Socket) {
  // TODO!
  // Rajz feldolgozása...
  // const user = getUser(socket.id);
  // console.log(user);
  // TODO!
  // Rajz kiküldése
  // socket.broadcast.to(user.room).emit('draw', data);
}

function startGame(socket: Socket) {
  // TODO!
//  const user = getUser(socket.id);
//  const room = getRoom(user.room);
  //socket.to(user.room).emit('startGame', {room.time });
}
