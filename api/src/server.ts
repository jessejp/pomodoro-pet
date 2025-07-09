import { RedisStore } from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import { createClient } from "redis";
import passport from "./auth/passport.js";
import { __prod__ } from "./constants.js";
import authRoutes from "./routes/auth.js";
import pomodoroRoutes from "./routes/pomodoro.js";
import userRoutes from "./routes/user.js";

export async function createServer() {
  const app = express();

  let redisClient = createClient();
  redisClient.connect().catch(console.error);

  const sessionStore = new RedisStore({
    client: redisClient,
    prefix: "ppsess:",
    disableTouch: true,
  });

  app.use(
    cors<cors.CorsRequest>({
      credentials: true,
      origin: ["http://localhost:5173"],
    }),
    express.json(),
    session({
      secret: "actually-the-secret-key-lol-4242-yieryjkjykrjkrjy4",
      resave: false,
      saveUninitialized: false,
      name: "qid",
      store: sessionStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true, // disable client-side JS access
        sameSite: "lax",
        secure: __prod__,
      },
    }),
    passport.initialize(),
    passport.session()
  );

  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  app.use("/pomodoro", pomodoroRoutes);

  return app;
}
