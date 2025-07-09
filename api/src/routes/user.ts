import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import { prisma } from "../context/db";

const router = Router();

router.post("/", async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  const newUser = await prisma.user.create({
    data: { name, isPublic: false },
  });

  req.login(newUser, (err) => {
    if (err) {
      console.error("Login error:", err);
      return next(err);
    }
    console.log("User logged in:", newUser);
    res.status(201).json(newUser);
  });
});

router.get("/", isAuth, async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      _count: true,
      pomodoroSessions: true,
      tasks: true,
      accounts: true,
      authSessions: true,
    },
  });
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      _count: true,
      pomodoroSessions: true,
      tasks: true,
    },
  });

  if (user) {
    console.dir(user, { depth: null });
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

export default router;
