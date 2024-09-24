# Express js backend

Chat alkalmazás tutorial videó:<br>
https://youtube.com/playlist?list=PL0Zuz27SZ-6NOkbTDxKi7grs_oxJhLu07&si=8bg-HJ0wOWEvA_gX

In deployement the server hosts a static page under "./public".<br>
A szerver egy statikus weboldalt fog hosztolni éles környezetben a : "./public" alatt.

## Test

Install node modules with npm:<br>
Telepítsd a node csomagokat npm-el:

```bash
  cd projektmunka/server
  npm i
```

then run:<br>
majd futtasd:

```bash
  npm run dev
```

Websocket port: **localhost:3000**<br>
Valós idejű kommunikáció: **localhost:3000**

Allowed (for vite testing) port: **5173**<br>
Tesztelés miatt megengedett port: **5173**

## Websocket reference

### Connect to websocket:

```js
const socket = io('ws://localhost:3000');
```

Server will send back a message to the user:<br>
A szerver egy üzenetet fog visszaküldeni a becsatlakozott felhasználónak:

> Welcome User!

Server will send a message to other users:<br>
Emellett a szerver egy üzenetet fog küldeni a másik felhasználóknak:

> User IXkj5 connected!

### Send message:

```js
socket.emit('message', '<your message>');
```

Server will emit message to everyone, including sender:<br>
A szerver egy üzenetet fog küldeni mindekinek:

> IXkj5: \<your message>

### Listen for message:

```js
  socket.on('message', <your callback function>)
```

### Displaying activity:

Place this into an eventListener to emit a message when a user is typing:<br>
Minta, ha szeretnél egy üzentet küldeni, ha a felhasználó gépel:

```js
  <your div>.addEventListener('keypress', () => {
    socket.emit('activity', socket.id.substring(0, 5))
  })
```

Use this if you want to get notified when someone starts typing:<br>
Minta, ha szeretnéd, hogy értesülve legyen a felhasználó, ha más gépel:

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

Server will broadcast message to everyone:<br>
A szerver mindekinek el fogja küldeni:

> User IXkj5 disconnected!
