import passport from "passport";
import { Strategy as GoogleAuthStrategy } from "passport-google-oauth20";
import prisma from "../context/db.js";
import { UserSchema } from "../routes/user.js";

if (process.env.NODE_ENV !== "test") {
  passport.use(
    new GoogleAuthStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("Google profile:", profile);
        try {
          const account = await prisma.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: "google",
                providerAccountId: profile.id,
              },
            },
            include: { user: true },
          });

          if (account && account.user) {
            return done(null, account.user);
          }

          const newUser = await prisma.user.create({
            data: {
              name: profile.displayName,
            },
          });

          await prisma.account.create({
            data: {
              userId: newUser.id,
              type: "oauth",
              provider: "google",
              providerAccountId: profile.id,
              accessToken: accessToken,
              refreshToken: refreshToken,
            },
          });

          return done(null, newUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}


passport.serializeUser((user: any, done) => {
  const parseResult = UserSchema.safeParse(user);
  if (!parseResult.success) {
    return done(new Error("Invalid user object for serialization"));
  }
  done(null, user.id); // Store user.id in the session
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user); // Make user available as req.user
  } catch (err) {
    done(err);
  }
});

export default passport;
