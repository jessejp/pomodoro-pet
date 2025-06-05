import session from "express-session";
import { PrismaClient, User } from "./generated/prisma";
import express from "express";
import passport from "passport";
import {Strategy as GoogleAuthStrategy} from "passport-google-oauth20";


const prisma = new PrismaClient();

async function main() {
  const app = express();
  app.use(
    express.json(),
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
    }),
    passport.initialize(),
    passport.session()
  );

  passport.use(new GoogleAuthStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("Google profile:", profile);
    try {
      const account = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider: 'google',
            providerAccountId: profile.id
          }
        },
        include: { user: true }
      });

      if (account && account.user) {
        return done(null, account.user);
      }

      const newUser = await prisma.user.create({
        data: {
          name: profile.displayName,
        }
      });

      await prisma.account.create({
        data: {
          userId: newUser.id,
          type: 'oauth',
          provider: 'google',
          providerAccountId: profile.id,
          accessToken: accessToken,
          refreshToken: refreshToken,
        }
      });

      return done(null, newUser);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user: User, done) => {
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

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }) // 'scope' asks for specific permissions
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), // Or some other error page
  (req, res) => {
    console.log("User authenticated:", req.user);
    // Successful authentication, redirect home or to dashboard.
    // req.user is now populated.
    res.redirect('/'); // Or your PWA's main page
  }
);

app.post('/logout', (req, res, next) => {
  req.logout(function(err) { // req.logout is an async function provided by Passport
    if (err) { return next(err); }
    req.session.destroy(() => { // Clean up the session
        res.clearCookie('connect.sid'); // Clear the session cookie (name might vary)
        res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});




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
