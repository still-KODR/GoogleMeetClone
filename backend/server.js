require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      try {
        const user = {
          id: profile.id,
          name: profile.displayName || "No Name",

          email: profile.emails?.[0]?.value || null,

          photo: profile.photos?.[0]?.value || null,
        };

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign(req.user, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.redirect(
        `http://localhost:5173/login-success?token=${token}`
    )
  },
);

// app.use("/app",application)

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    socket.emit("receiver_message", data);
  });
});

httpServer.listen(8000, () => {
  console.log("server running");
});