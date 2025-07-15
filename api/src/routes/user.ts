import { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import { validateRequest } from "../middleware/validateRequest.js";
import prisma from "../context/db.js";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  isPublic: z.boolean(),
}).openapi("User");

// Validation schemas for different routes
export const CreateUserBodySchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
}).openapi("CreateUserBodySchema");

export const GetUserByIdParamsSchema = z.object({
  id: z.string().min(1, "User ID is required"),
}).openapi("GetUserByIdParamsSchema");

const router = Router();

router.post(
  "/",
  validateRequest({ body: CreateUserBodySchema }),
  async (req, res, next) => {
    const { name } = req.body;

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
  }
);

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

router.get(
  "/:id",
  validateRequest({ params: GetUserByIdParamsSchema }),
  async (req, res) => {
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
  }
);

export default router;
