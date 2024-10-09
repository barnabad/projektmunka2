import { Server as SocketIoServer, Socket } from 'socket.io';
import { Room } from '../models/RoomClass.js';
import { gamePlaySocket } from './gameplay.js';
import { roomSocket } from './room.js';

const ADMIN = 'Admin';
export type RoomContainer = Map<string, Room>;
let ROOMS: RoomContainer = new Map();

// Websocket beállítása
export function setupSockets(io: SocketIoServer) {
  io.on('connection', (socket: Socket) => {
    console.log(`User ${socket.id} connected`);

    // Szobába csatlakozás
    roomSocket(io, socket, ROOMS);

    // Játékmenet
    gamePlaySocket(socket, ROOMS);

    socket.on('disconnect', () => console.log(`User ${socket.id} disconnected`));
  });
}
