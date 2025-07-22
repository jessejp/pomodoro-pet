import { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import { validateRequest } from "../middleware/validateRequest.js";
import prisma from "../context/db.js";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

const router = Router();

// Zod schemas
export const CreatePomodoroSessionSchema = z.object({
  workTimeMinutes: z.number().int().min(1).max(180),
  breakTimeMinutes: z.number().int().min(1).max(60),
  rounds: z.number().int().min(1).max(12),
}).openapi("CreatePomodoroSessionSchema");

// Create a new pomodoro session
router.post(
  "/",
  isAuth,
  validateRequest({ body: CreatePomodoroSessionSchema }),
  async (req, res) => {
    const user = req.user as Express.User;
    const { workTimeMinutes, breakTimeMinutes, rounds } = req.body;
    const userId = user.id;

    const existingSession = await prisma.pomodoroSession.findFirst({
      where: {
        userId,
        endDate: { equals: prisma.pomodoroSession.fields.startDate },
      },
    });

    if (existingSession) {
      res.status(400).json({ error: "You already have an active session" });
      return;
    }

    const session = await prisma.pomodoroSession.create({
      data: {
        userId,
        workTimeMinutes,
        breakTimeMinutes,
        rounds,
        startDate: new Date(),
        endDate: new Date(), // can be updated when finished
        stopDate: new Date(), // can be updated when finished
      },
    });
    res.status(201).json(session);
  }
);

// Get the logged-in user's active session (e.g., not finished)
router.get("/active", isAuth, async (req, res) => {
  const { id: userId } = req.user as Express.User;
  // Define 'active' as a session where endDate == startDate (not finished)
  const session = await prisma.pomodoroSession.findFirst({
    where: {
      userId,
      endDate: { equals: prisma.pomodoroSession.fields.startDate },
    },
    orderBy: { startDate: "desc" },
  });
  if (!session) {
    res.status(404).json({ error: "No active session" });
    return;
  }
  res.json(session);
});

// Finish a session (by id)
const FinishSessionParamsSchema = z.object({
  id: z.string().min(1),
});
router.post(
  "/:id/finish",
  isAuth,
  validateRequest({ params: FinishSessionParamsSchema }),
  async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user as Express.User;
    // Only allow finishing your own session
    const session = await prisma.pomodoroSession.findUnique({
      where: { id, AND: { userId } },
    });
    if (!session) {
      res.status(404).json({ error: "Session not found" });
      return;
    }
    const finished = await prisma.pomodoroSession.update({
      where: { id },
      data: {
        endDate: new Date(),
        stopDate: new Date(),
      },
    });
    res.json(finished);
  }
);

export default router;
