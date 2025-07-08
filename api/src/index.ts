import { RedisStore } from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import { createClient } from "redis";
import passport from "./auth/passport";
import { __prod__ } from "./constants";
import { prisma } from "./context/db";
import authRoutes from "./routes/auth";
import pomodoroRoutes from "./routes/pomodoro";
import userRoutes from "./routes/user";



async function main() {
  const app = express();

  let redisClient = createClient();
  redisClient.connect().catch(console.error);

  let redisStore = new RedisStore({
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
      store: redisStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true, // disable client-side JS access
        sameSite: "lax",
        secure: __prod__,
      },
    }),
    passport.initialize(),
    passport.session(),
  );

  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  app.use("/pomodoro", pomodoroRoutes);

  const port = process.env.PORT;

  app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
