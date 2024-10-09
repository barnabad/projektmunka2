import express, {Application} from 'express';
import { Server as HttpServer } from 'http';
import { Server as SocketIoServer } from 'socket.io';
import { instrument } from "@socket.io/admin-ui";
import { setupSockets } from './sockets/setup.js';

const PORT: number = Number(process.env.PORT) || 3000;

// Express server creation
const app: Application = express();

// Serving static files
app.use(express.static('public'));

const server: HttpServer = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// Creating WebSocket
const io = new SocketIoServer(server, {
  cors: { origin: process.env.NODE_ENV === 'production' ? false : 
    ['http://localhost:5173', 'http://127.0.0.1:5173'] }
});

if (process.env.NODE_ENV !== 'production') {
  instrument(io, { auth: false, mode: "development" });
}

// Setting up WebSocket
setupSockets(io);

