import { Router } from "express";
import Template from "../models/Templates.js";

const templates = Router();

// ============ GET User's Templates ============
templates.get("/:user_id", (req, res) => {
  const { user_id } = req.params;

  Template.findAll({ where: { user_id: user_id } })
    .then((templates) => res.send(templates))
    .catch((err) => res.status(400).send(err));
});

export default templates;
