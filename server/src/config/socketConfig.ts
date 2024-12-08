export const socketConfig = {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:3000",
            "http://127.0.0.1:3000",
          ],
  },
};
