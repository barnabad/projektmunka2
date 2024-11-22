import { io } from "socket.io-client";

const URL = "https://localhost:3000";

export const socket = io(URL, {
  autoConnect: true,
  secure: true,
});
