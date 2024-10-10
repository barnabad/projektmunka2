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
  // TODO: random szoba id létrehozása
  const roomId: string = Math.floor(Math.random() * 100).toString();

  try {
    // Szoba létrehozás és csatlakozás
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

    // Kliens értesítése
    joinSuccessful(socket, socket.id, roomId);
    updatePlayers(io, roomId, ROOMS.get(roomId)!.playersList);

    // Hiba kiiratása console-ra
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
  const room = ROOMS.get(roomId);

  if (room) {
    // Ellenőrzi van-e elég férőhely a szobában
    if (room.playersList.length === room.maxPlayers) {
      console.log(`Room: ${roomId} is already full`);
      return;
    }

    // Szobába csatlakozás
    try {
      socket.join(roomId);
      room.addPlayer(new Player(socket.id, name));
      joinSuccessful(socket, socket.id, roomId);
      updatePlayers(io, roomId, room.playersList);
      // JohnDoe123 has joined room
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
    updatePlayers(io, roomId, room.playersList);
  }
}

// Játékos értesítése
function joinSuccessful(socket: Socket, ownerId: string, roomCode: string) {
  socket.emit("join-successful", { ownerId: ownerId, roomCode: roomCode });
}

// Szobában levők értesítése
function updatePlayers(io: Server, roomId: string, players: Player[]) {
  io.to(roomId).emit("updated-players", players);
}
