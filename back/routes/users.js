import { Router } from "express";
import { literal } from "sequelize";
import {
  getAccountInfo,
  createNewAccount,
  deleteAccount,
  salesforceLogout,
} from "../salesforce.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const users = Router();

// =============== GET All Users ================
users.get("/", (req, res) => {
  User.findAll({
    order: ["user_id"],
  })
    .then((users) => res.send(users))
    .catch((err) => res.status(404).send(err));
});

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

      // Getting user information from salesforce
      const account = await getAccountInfo(email);
      if (account.status == "error") throw account.message;

      const token = jwt.sign(
        {
          id: user.user_id,
          email: user.email,
          first_name: user.first_name,
          status: user.status,
          admin: user.admin,
          account: account.response[0],
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send({
          status: "success",
          message: "User logged in succesfully!",
          response: user,
        });
    })
    .catch((err) => res.status(400).send({ status: "error", message: err }));
});

// ============= GET User By Token ==============
users.get("/token", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({
      status: "error",
      message: "Forbidden access, token not provided.",
    });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    res.send({ status: "success", response: data });
  } catch (err) {
    res.status(401).send({ status: "error", message: "Invalid token." });
  }
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
    .then(async (user) => {
      // Create new account in salesforce
      await createNewAccount(email);

      res.send({
        status: "success",
        message: "User registered successfully!",
        response: user,
      });
    })
    .catch((err) =>
      res.status(400).send({ status: "error", message: err.errors[0].message })
    );
});

// ========== PATCH Check User By ID ============
users.patch("/:id/check", (req, res) => {
  const { id } = req.params;

  User.update(
    { checked: literal("NOT checked") },
    {
      where: {
        user_id: id,
      },
    }
  )
    .then((check) => res.send({ affectedRows: check[0] }))
    .catch((err) => res.status(400).send(err));
});

// =========== PATCH Check All Users ============
users.patch("/check-all", (req, res) => {
  const { status } = req.body;

  User.update(
    { checked: status },
    {
      where: {
        checked: !status,
      },
    }
  )
    .then((check) => res.send({ affectedRows: check[0] }))
    .catch((err) => res.status(400).send(err));
});

// ========= PATCH Block/Unblock Users ==========
users.patch("/status", (req, res) => {
  const { status } = req.body;

  User.update(
    { status: status },
    {
      where: {
        checked: true,
      },
    }
  )
    .then((rows) => {
      if (rows[0] == 0) throw "Select at least one register.";
      if (status) {
        res.send({
          status: "success",
          message: "User(s) successfully unblocked.",
        });
      } else {
        res.send({
          status: "success",
          message: "User(s) successfully blocked.",
        });
      }
    })
    .catch((err) => res.status(400).send({ status: "error", message: err }));
});

// ========= PATCH Update Admin Status ==========
users.patch("/admin", (req, res) => {
  const { status } = req.body;

  User.update(
    { admin: status },
    {
      where: {
        checked: true,
      },
    }
  )
    .then((rows) => {
      if (rows[0] == 0) throw "Select at least one register.";
      if (status) {
        res.send({
          status: "success",
          message: "User(s) now is admin.",
        });
      } else {
        res.send({
          status: "success",
          message: "User(s) removed from admins.",
        });
      }
    })
    .catch((err) => res.status(400).send({ status: "error", message: err }));
});

// ============ DELETE Checked User =============
users.delete("/", async (req, res) => {
  const users = await User.findAll({
    where: { checked: true },
    attributes: ["email"],
  });

  User.destroy({
    where: {
      checked: true,
    },
  })
    .then((rows) => {
      if (rows == 0) throw "Select at least one register.";

      // Delete users in Salesforce
      users.map(async (user) => {
        await deleteAccount(user.email);
      });

      res.send({
        status: "success",
        message: "User(s) successfully deleted.",
        affectedRows: rows,
      });
    })
    .catch((err) => res.status(400).send({ status: "error", message: err }));
});

// ============== POST User Logout ==============
users.post("/logout", (req, res) => {
  salesforceLogout();
  res
    .clearCookie("token")
    .send({ status: "succes", message: "Logout successful!" });
});

export default users;
