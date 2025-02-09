import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { where } from "sequelize";

const users = Router();

// =============== GET All Users ================
users.get("/", (req, res) => {
  User.findAll()
    .then((users) => res.send(users))
    .catch((err) => res.status(404).send(err));
});

// ============= GET User By Token ==============
users.get("/:token", (req, res) => {});

// ======= GET User By Email and Password =======
users.get("/:email/:password", (req, res) => {
  //   const { email, password } = req.params;
  //   if (!email || !password) {
  //     return res.status(400).send({
  //       status: "error",
  //       message: "Please provide email and password.",
  //     });
  //   }
  //   User.findAll({
  //     where: {
  //       email: email,
  //     },
  //   })
  //     .then((user) => res.send(user))
  //     .catch((err) => res.status(404).send(err));
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
