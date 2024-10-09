import { Socket } from "socket.io";

export function roomSocket(socket: Socket) {
  socket.on("create-room", () => {});

  //socket.on("join-room");
  //socket.on("disconnect");
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

function createRoom({ name, options }: CreateRoomType) {
  const roomId = Math.floor(Math.random() * 100);


}
