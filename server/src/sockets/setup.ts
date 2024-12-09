import { Server as SocketIoServer, Socket } from "socket.io";
import { Room } from "../models/RoomClass.js";
import { gamePlaySocket } from "./gameplay.js";
import { roomSocket, leaveRoom } from "./room.js";
import { chatSocket } from "./chat.js";

const ADMIN = "Admin";
export type RoomContainer = Map<string, Room>;
let ROOMS: RoomContainer = new Map();

// Websocket beállítása
export function setupSockets(io: SocketIoServer) {
  io.on("connection", (socket: Socket) => {
    const most = new Date();
    const time =
      most.getFullYear().toString() +
      "-" +
      (most.getMonth() + 1).toString() +
      "-" +
      most.getDate().toString() +
      "T" +
      most.getHours() +
      ":" +
      most.getMinutes();

    console.log(`${time} INFO User ${socket.id} connected`);

    // Szobába csatlakozás
    roomSocket(io, socket, ROOMS);

    // Játékmenet
    gamePlaySocket(io, socket, ROOMS);

    // Chat funkciók
    chatSocket(io, socket, ROOMS);

    socket.on("disconnect", () => {
      console.log(`${time} INFO User ${socket.id} disconnected`);
      leaveRoom(io, socket, ROOMS);
    });
  });
}
