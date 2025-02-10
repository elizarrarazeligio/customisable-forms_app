import { response, Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const users = Router();

// =============== GET All Users ================
users.get("/", (req, res) => {
  User.findAll()
    .then((users) => res.send(users))
    .catch((err) => res.status(404).send(err));
});

// ============= GET User By Token ==============
users.get("/:token", (req, res) => {});

// ============== POST User Login ===============
users.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      status: "error",
      message: "Please provide email and password.",
    });
  }

  User.findOne({
    where: {
      email: email,
    },
  })
    .then(async (user) => {
      if (user === null) throw "User not registered, please register first.";

      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) throw "Invalid password.";
      if (user.status === true) throw "Blocked account.";

      const token = jwt.sign(
        { id: user.user_id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, { httpOnly: true, secure: true }).send({
        status: "success",
        message: "User logged in succesfully!",
        response: user,
      });
    })
    .catch((err) => res.status(400).send({ status: "error", message: err }));
});

// =========== POST Register New User ===========
users.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!email || !password || !first_name || !last_name) {
    return res.status(400).send({
      status: "error",
      message: "Please provide all required fields.",
    });
  }

  const hashedPasword = await bcrypt.hash(password, 10);
  User.create({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: hashedPasword,
  })
    .then((user) => {
      res.send({
        status: "success",
        message: "User registered successfully!",
        response: user,
      });
    })
    .catch((err) => res.status(400).send(err));
});

export default users;
