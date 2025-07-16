import prisma from "../context/db.js";
import { config } from "dotenv-safe";
import { Router } from "express";
import passport from "passport";
import { UserSchema } from "./user.js";

config();

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}?error=authentication_failed`,
  }),
  async (req, res) => {
    try {
      const user = UserSchema.parse(req.user);
      if (!user) {
        throw new Error("User not found");
      }

      await prisma.authSession.create({
        data: {
          userId: user.id,
          sessionToken: req.session.id,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        },
      });
      console.log("User authenticated:", req.user);
      res.redirect(process.env.FRONTEND_URL);
    } catch (error) {
      console.error("Error authenticating user:", error);
      res.redirect(`${process.env.FRONTEND_URL}?error=authentication_failed`);
    }
  }
);

router.post("/logout", async (req, res, next) => {
  try {
    await prisma.authSession.deleteMany({
      where: {
        sessionToken: req.session.id,
      },
    });
  } catch (error) {
    console.error("Error logging out:", error);
  }
  req.logout(async function (err) {
    if (err) {
      return next(err);
    }

    req.session.destroy(() => {
      res.clearCookie("qid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

export default router;
