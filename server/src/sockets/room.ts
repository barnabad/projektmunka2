import { Socket, Server } from "socket.io";
import { RoomContainer } from "./setup.js";
import { Room } from "../models/RoomClass.js";
import { Player } from "../models/PlayerClass.js";

export function roomSocket(io: Server, socket: Socket, ROOMS: RoomContainer) {
  socket.on("create-room", (data: CreateRoomType) =>
    createRoom(io, socket, data, ROOMS)
  );

  socket.on("join-room", ({ roomId, name }: { roomId: string; name: string }) =>
    joinRoom(io, socket, ROOMS, roomId, name)
  );

  socket.on("leave-room", (roomId: string) =>
    leaveRoom(io, socket, ROOMS, roomId)
  );
}

// Functions

type CreateRoomType = {
  name: string;
  options: {
    maxRounds: number;
    maxPlayers: number;
    drawTime: number;
    language: "hungarian" | "english";
  };
};

function createRoom(
  io: Server,
  socket: Socket,
  { name, options }: CreateRoomType,
  ROOMS: RoomContainer
) {
  const roomId: string = Math.floor(Math.random() * 100).toString();
  try {
    socket.join(roomId);
    ROOMS.set(
      roomId,
      new Room(
        options.language,
        options.maxPlayers,
        options.maxRounds,
        options.drawTime,
        socket.id,
        [new Player(socket.id, name)]
      )
    );
    socket.emit("join-successful", {
      ownerId: socket.id,
      roomCode: roomId,
    });
    io.to(roomId).emit("updated-players", ROOMS.get(roomId)?.playersList);
  } catch (error) {
    console.log("Error in create-room", error);
  }
}

function joinRoom(
  io: Server,
  socket: Socket,
  ROOMS: RoomContainer,
  roomId: string,
  name: string
) {
  console.log(roomId);
  const room = ROOMS.get(roomId);

  if (room) {
    if (room.playersList.length === room.maxPlayers) {
      console.log(`Room: ${roomId} is already full`);
      return;
    }
    try {
      socket.join(roomId);
      room.addPlayer(new Player(socket.id, name));
      socket.emit("join-successful", {
        ownerId: room.ownerId,
        roomCode: roomId,
      });
      io.to(roomId).emit("updated-players", room.playersList);
      // Majom123 has joined room
    } catch (error) {
      console.error("Error joining room", error);
    }
  } else {
    console.error(`Room with id ${roomId} does not exist`);
  }
}

function leaveRoom(
  io: Server,
  socket: Socket,
  ROOMS: RoomContainer,
  roomId: string
) {
  const room = ROOMS.get(roomId)!;

  if (room.containsPlayer(roomId)) {
    room.removePlayer(socket.id);
    io.to(roomId).emit("updated-players", room.playersList);
  }
}
