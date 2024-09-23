import express from 'express';
import { Server as SocketIo } from 'socket.io';
import { setupSockets } from './sockets/setup.js';

const PORT = process.env.PORT || 3000;

// Express szerver létrehozása
const app = express();

// Statikus fájlok kiszolgálása
app.use(express.static('public'));

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// Websocket létrehozása
const io = new SocketIo(server, {
  cors: { origin: process.env.NODE_ENV === 'production' ? false: 
    ['http://localhost:5173', 'http://127.0.0.1:5173']}
  });

// Websocket beállítása
setupSockets(io);