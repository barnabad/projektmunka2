import { Server as SocketIoServer, Socket } from 'socket.io';
import { gamePlaySocket } from './gameplay.js';
import { roomSocket } from './room.js';

const ADMIN = 'Admin';

// Websocket beállítása
export function setupSockets(io: SocketIoServer) {
  io.on('connection', (socket: Socket) => {
    console.log(`User ${socket.id} connected`);

    // Szobába csatlakozás
    roomSocket(socket);

    // Játékmenet
    gamePlaySocket(socket);

    socket.on('disconnect', () => console.log(`User ${socket.id} disconnected`));
  });
}
