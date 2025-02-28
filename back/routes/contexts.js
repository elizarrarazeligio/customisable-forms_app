import { Router } from "express";
import Context from "../models/Contexts.js";

const contexts = Router();

// ============= GET User's Context =============
contexts.get("/user/:user_id", (req, res) => {
  const { user_id } = req.params;

  Context.findOne({ where: { user_id } })
    .then((context) => {
      if (!context) throw "Context not found";
      res.send(context);
    })
    .catch((err) => res.status(404).send({ status: "error", message: err }));
});

// ============== POST New Context ==============
contexts.post("/user/:user_id/add", (req, res) => {
  const { user_id } = req.params;

  Context.create({ user_id })
    .then((context) => res.send(context))
    .catch((err) =>
      res.status(404).send({ status: "error", message: err.parent.detail })
    );
});

// ============ PATCH Update Context ============
contexts.patch("/user/:user_id/update", (req, res) => {
  const { user_id } = req.params;
  const { theme } = req.body;
  if (!theme)
    return res
      .status(400)
      .send({ status: "error", message: "Theme not provided." });

  Context.update({ theme }, { where: { user_id } })
    .then((row) => {
      if (row[0] == 0) throw "Theme not able to change.";
      res.send({ status: "success", affectedRows: row[0] });
    })
    .catch((err) => res.status(404).send({ status: "error", message: err }));
});

export default contexts;
