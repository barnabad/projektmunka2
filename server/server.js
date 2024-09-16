import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

// Getting project directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3000;

// Creating express server
const app = express();

// Hosting built react frontend - otherwise it will be error
app.use(express.static(path.join(__dirname, '../client/dist')));

const expressServer = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// Creating websocket
const io = new Server(expressServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false:
    ['http://localhost:5173', 'http://127.0.0.1:5173']
  }
});

io.on('connection', socket => {
  console.log(`User ${socket.id} connected`);

  // Upon connection - only to user
  socket.emit('message', 'Welcome User!');

  // Upon connection - to all others
  socket.broadcast.emit('meesage', `User ${socket.id.substring(0, 5)} connected!`)

  // Listening for a message event
  socket.on('message', data => {
    console.log(data);
    io.emit('message', `${socket.id.substring(0, 5)}: ${data}`);
  })

  // When user disconnects - to all others
  socket.on.apply('disconnect', () =>{
    socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)} disconnected!`)
  })

  // Listen for activity
  socket.on('activity', (name) => {
    socket.broadcast.emit('activity', name)
  })
});
