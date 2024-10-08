import { gamePlaySocket } from './gameplay.js';
import { roomSocket } from './room.js';

const ADMIN = 'Admin';

// Websocket beállítása
export function setupSockets(io) {
  io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    // Szobába csatlakozás
    roomSocket(socket);

    // Játékmenet
    gamePlaySocket(socket);

    socket.on('disconnect', console.log(`User ${socket.id} disconnected`));
  });
}
