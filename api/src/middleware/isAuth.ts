import { NextFunction, Request, Response } from "express";

export function isAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}
