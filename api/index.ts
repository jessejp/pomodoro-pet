import { PrismaClient } from "./generated/prisma";
import express from "express";
const prisma = new PrismaClient();

async function main() {
  const app = express();
  app.use(express.json());

  app.post("/user", async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: "Name is required" });
      return;
    }

    const newUser = await prisma.user.create({
      data: { name, isPublic: false },
    });
    res.status(201).json(newUser);
  });

  app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany({
      include: {
        _count: true,
        pomodoroSessions: true,
        tasks: true,
      },
    });
    res.json(users);
  });

  app.get("/user/:id", async (req, res) => {
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
  const port = process.env.PORT || 8000;
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
