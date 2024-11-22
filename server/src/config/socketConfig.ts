export const socketConfig = {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://localhost:3000", "https://127.0.0.1:3000"]
        : ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  },
};
