import { Socket } from "socket.io";

export function sendError(socket: Socket, error: string) {
  socket.emit("error", error);
}
