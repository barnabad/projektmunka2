import {
  activateUser,
  userLeavesApp,
  getUser,
  getUsersInRoom,
  getAllActiveRooms,
} from '../states/usersState.js';
import { onDrawSocket } from './draw.js';

const ADMIN = 'Admin';


// Websocket beállítása
export function setupSockets(io) {
  io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    // Csatlakozás során - üzenet csatlakozó számára
    socket.emit('message', buildMsg(ADMIN, 'Welcome to Chat App!'));

    // Szobába lépés során
    socket.on('enterRoom', ({ name, room }) => enterRoom(io, socket, name, room));

    // Lecsatlakozás során - többi felhasználónak
    socket.on('disconnect', () => onDisconnect(io, socket));

    // Üzenet érkezése - küldése során
    socket.on('message', ({ name, text }) => listenMessage(io, socket, name, text));

    // Aktivitás során
    socket.on('activity', (name) => listenActivity(socket, name));

    // Rajz során
    onDrawSocket(socket);
  });
}

// Szobába csatlakozás
function enterRoom(io, socket, name, newRoom) {
  const prevRoom = getUser(socket.id)?.room;

  // Előző szoba elhagyása - többi értesítése
  leaveRoom(io, socket, name, prevRoom, newRoom);

  const user = getUser(socket.id);

  // Csatlakozás
  socket.join(user.room);

  // Üzenet küldése csatlakozó számára
  socket.emit('message', buildMsg(ADMIN, `You have joined the ${user.room} chat room`));

  // Mindenki más számára
  socket.broadcast
    .to(user.room)
    .emit('message', buildMsg(ADMIN, `${user.name} has joined the room`));

  // Felhasználói lista frissítése, értesítése
  io.to(user.room).emit('userList', { users: getUsersInRoom(user.room) });

  // Szobába levő felhaszálók frissítése
  io.emit('roomList', { rooms: getAllActiveRooms() });
}

// Szobából való kilépés során
function leaveRoom(io, socket, name, prevRoom, newRoom) {
  if (prevRoom) {
    socket.leave(prevRoom);
    io.to(prevRoom).emit('message', buildMsg(ADMIN, `${name} has left the room`));
  }

  activateUser(socket.id, name, newRoom);

  // Cannot update previous room users list until after the state update in activate user
  if (prevRoom) {
    io.to(prevRoom).emit('userList', { users: getUsersInRoom(prevRoom) });
  }
}

// Lecsatlakozás során frissítjük a listákat
function onDisconnect(io, socket) {
  const user = getUser(socket.id);
  userLeavesApp(socket.id);

  if (user) {
    io.to(user.room).emit('message', buildMsg(ADMIN, `${user.name} has left the room`));
    io.to(user.room).emit('userList', { users: getUsersInRoom(user.room) });
    io.emit('roomList', { rooms: getAllActiveRooms() });
  }

  console.log(`User ${socket.id} disconnected`);
}

// Üzenet fogadása - küldése
function listenMessage(io, socket, name, text) {
  const room = getUser(socket.id)?.room;
  if (room) io.to(room).emit('message', buildMsg(name, text));
}

// Aktivitás figyelése
function listenActivity(socket, name) {
  const room = getUser(socket.id)?.room;
  if (room) socket.broadcast.to(room).emit('activity', name);
}

function buildMsg(name, text) {
  return {
    name,
    text,
    time: new Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(new Date()),
  };
}
