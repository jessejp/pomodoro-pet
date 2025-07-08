import { config } from "dotenv-safe";
import { Router } from "express";
import passport from "passport";

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
  (req, res) => {
    console.log("User authenticated:", req.user);
    res.redirect(process.env.FRONTEND_URL);
  }
);

router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    // req.logout is an async function provided by Passport
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      // Clean up the session
      res.clearCookie("connect.sid"); // Clear the session cookie (name might vary)
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

export default router;