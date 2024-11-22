import { Server as SocketIoServer } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import { setupSockets } from "./sockets/setup.js";
import { socketConfig } from "./config/socketConfig.js";
import dotenv from "dotenv";
import express from "express";
import https from "https";
import fs from "fs";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Path to SSL certificate and key
const SSL_CERT_PATH = "./certs/cert.pem";
const SSL_KEY_PATH = "./certs/key.pem";

// Create Express app
const app = express();

// Read SSL certificate and key
const httpsOptions = {
  key: fs.readFileSync(SSL_KEY_PATH),
  cert: fs.readFileSync(SSL_CERT_PATH),
};

// Create HTTPS server
const server = https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`HTTPS Server running at https://localhost:${PORT}`);
});

// Serving static files
app.use(express.static("public"));

// Creating WebSocket
const io = new SocketIoServer(server, socketConfig);
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== "production") {
  instrument(io, { auth: false, mode: "development" });
} else {
  instrument(io, {
    auth: {
      type: "basic",
      username: process.env.USERNAME!,
      password: process.env.PASSWORD!,
    },
  });
}

// Setting up WebSocket
setupSockets(io);
