import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import env from "dotenv";
import GoogleStrategy from "passport-google-oauth2";
import cors from "cors";
import { Pool } from "pg";
import connectPgSimple from "connect-pg-simple";
const app = express();
const port = 5000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

const pool = new Pool({
  connectionString: "postgresql://postgres:8721@localhost:5432/keeper",
});

const pgSession = connectPgSimple(session);

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
      createTableIfMissing: true,
    }),
    secret: "TOPSECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, //for one day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "keeper",
  password: "8721",
  port: 5432,
});
db.connect();

async function hashpassword(user_in_password) {
  try {
    const hashedpass = await bcrypt.hash(user_in_password, saltRounds);
    //console.log(hashedpass);
    return hashedpass;
  } catch (error) {
    console.log("hashing error:", error.message);
  }
}

async function checkinghash(user_in_password, hashedpass) {
  try {
    const match = await bcrypt.compare(user_in_password, hashedpass);
    return match;
  } catch (error) {
    console.log("You have error during comparing passwords:", error.message);
  }
}

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  app.render("./public/index.html");
});

app.get("/main", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.post("/info/signup", async (req, res) => {
  //console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const res0 = await db.query("select * from users where email=$1", [email]);
  if (res0.rows.length > 0) {
    res.redirect("/login");
  }
  const hashedpass = await hashpassword(password);
  try {
    const res1 = await db.query(
      "insert into users(name,email,password) values ($1,$2,$3)",
      [name, email, hashedpass]
    );
    const newUser = res1.rows[0];

    req.login(newUser, function (err) {
      if (err) {
        console.error("Login after signup failed:", err);
        return res.status(500).send("Signup succeeded but login failed");
      }
      return res
        .status(200)
        .json({ success: true, message: "Registered and logged in!" });
    });
  } catch (error) {
    console.log("You have a error in signup post req:", error.message);
  }
});

app.post("/info/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const res0 = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (res0.rows.length === 0) {
      res.send("You don't have an account. Please sign up.");
    } else {
      const match = await checkinghash(password, res0.rows[0].password);

      if (match) {
        req.login(res0.rows[0], function (err) {
          if (err) {
            console.log("Login error:", err);
            return res.status(404).json({ success: false });
          }
          return res.status(200).json({ success: true });
        });
      }
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).send("Internal server error");
  }
});

app.get("/notes", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Please log in first");
  }
  console.log(req.user); // gives me user_id from this console log
  const user_id = req.user;
  try {
    const note = await db.query("select * from notes where user_id = $1", [
      user_id,
    ]);

    res.json(note.rows);
  } catch (error) {
    console.log("Error Fetching notes:", error.message);
    res.status(500).send("Server Error");
  }
});

app.post("/notes", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Please log in first");
  }
  console.log(req.user); // gives me user_id from this console log
  const user_id = req.user;
  const title = req.body.title;
  const content = req.body.content;

  try {
    await db.query(
      "INSERT INTO notes(user_id, title, content) VALUES ($1, $2, $3)",
      [user_id, title, content]
    );
    res.status(201).send("Note created");
  } catch (error) {
    console.error("Error inserting note:", error.message);
    res.status(500).send("Server Error");
  }
});

app.get("/main", (req, res) => {
  if (req.isAuthenticated()) {
  }
});

passport.use(
  new Strategy(async function verify(email, password, cb) {
    try {
      const res0 = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (res0.rows.length === 0) {
        return cb("User not found");
      } else {
        const match = await checkinghash(password, res0.rows[0].password);
        const user = res0.rows[0];
        if (match) {
          return cb(null, user);
        } else {
          return cb(null, false);
        }
      }
    } catch (error) {
      return cb(error);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
