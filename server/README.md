# Express js backend

The server hosts a static page under "../client/dist".

## Test

Install projektmunka server with npm:

```bash
  cd projektmunka/server
  npm i
```

then run:

```bash
  npm run dev
```

Websocket is on: **localhost:3000**

Cors is allowed from port: **5173**

## Websocket reference

### Connect to websocket:

```js
const socket = io("ws://localhost:3000");
```

Server will send back a message to the user:

>  Welcome User!

Server will send back a message to other users:

>  User IXkj5 connected!

### Send message:

```js
socket.emit("message", "<your message>");
```

Server will emit message to everyone, including sender:

>  IXkj5: \<your message>

### Listen for message:

```js
  socket.on('message', <your callback function>)
```

### Displaying activity:

Place this into an eventListener to emit a message when a user is typing:

```js
  <your div>.addEventListener('keypress', () => {
    socket.emit('activity', socket.id.substring(0, 5))
  })
```

Use this if you want to get notified when someone starts typing:

```js
  let activityTimer
  socket.on('activity', (name) => {
    <your div>.textContent = `${name} is typing...`
    clearTimeout(activityTimer)
    activityTimer = setTimeout(() => {
      <your div>.textContent = ""
    }, 3000)
  })
```

### Upon disconnection:

Server will broadcast message to everyone:

>  User IXkj5 disconnected!
