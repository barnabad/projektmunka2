import { io } from "socket.io-client";

const URL = `https://${window.location.hostname}:3000`;

export const socket = io(URL, {
  autoConnect: true,
  secure: true,
});