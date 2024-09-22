import {
  activateUser,
  userLeavesApp,
  getUser,
  getUsersInRoom,
  getAllActiveRooms,
} from '../states/usersState.js';

const ADMIN = 'Admin';

// Websocket beállítása
export function setupSockets(io) {
  io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    // Upon connection - only to user
    socket.emit('message', buildMsg(ADMIN, 'Welcome to Chat App!'));

    // When user joins to room
    socket.on('enterRoom', ({ name, room }) => enterRoom(io, socket, name, room));

    // When user disconnects - to all others
    socket.on('disconnect', () => onDisconnect(io, socket));

    // Listen for a message event
    socket.on('message', ({ name, text }) => listenMessage(io, socket, name, text));

    // Listen for activity
    socket.on('activity', (name) => listenActivity(socket, name));
  });
}

function enterRoom(io, socket, name, room) {
  // leave previous room
  leaveRoom(io, socket);

  const user = activateUser(socket.id, name, room);

  // Cannot update previous room users list until after the state update in activate user
  const prevRoom = user?.room;
  if (prevRoom) {
    io.to(prevRoom).emit('userList', { users: getUsersInRoom(prevRoom) });
  }

  // join room
  socket.join(user.room);

  // To user who joined
  socket.emit('message', buildMsg(ADMIN, `You have joined the ${user.room} chat room`));

  // To everyone else
  socket.broadcast
    .to(user.room)
    .emit('message', buildMsg(ADMIN, `${user.name} has joined the room`));

  // Update user list for room
  io.to(user.room).emit('userList', { users: getUsersInRoom(user.room) });

  // Update rooms list for everyone
  io.emit('roomList', { rooms: getAllActiveRooms() });
}

function leaveRoom(io, socket) {
  const user = getUser(socket.id);
  const prevRoom = user?.room;

  if (prevRoom) {
    socket.leave(prevRoom);
    io.to(prevRoom).emit('message', buildMsg(ADMIN, `${user.name} has left the room`));
  }
}

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

function listenMessage(io, socket, name, text) {
  const room = getUser(socket.id)?.room;
  if (room) io.to(room).emit('message', buildMsg(name, text));
}

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
