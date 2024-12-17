import { Server as SocketIoServer, Socket } from "socket.io";
import { Room } from "../models/RoomClass.js";
import { gamePlaySocket } from "./gameplay.js";
import { roomSocket, leaveRoom } from "./room.js";
import { chatSocket } from "./chat.js";
import { log } from "../utils/logger.js";

const ADMIN = "Admin";
export type RoomContainer = Map<string, Room>;
let ROOMS: RoomContainer = new Map();

// Websocket beállítása
export function setupSockets(io: SocketIoServer) {
  io.on("connection", (socket: Socket) => {
    //console.log(`${time} INFO User ${socket.id} connected`);
    log("INFO", `User ${socket.id} connected`);

    // Szobába csatlakozás
    roomSocket(io, socket, ROOMS);

    // Játékmenet
    gamePlaySocket(io, socket, ROOMS);

    // Chat funkciók
    chatSocket(io, socket, ROOMS);

    socket.on("disconnect", () => {
      //console.log(`${time} INFO User ${socket.id} disconnected`);
      log("INFO", `User ${socket.id} disconnected`);
      leaveRoom(io, socket, ROOMS);
    });
  });
}
