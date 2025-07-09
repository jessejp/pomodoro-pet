import { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";

const router = Router();

router.post("/", isAuth, async (req, res) => {
  // Your logic for creating a pomodoro session goes here
  res
    .status(200)
    .json({ message: "Authenticated! Ready to create pomodoro session." });
});

export default router;