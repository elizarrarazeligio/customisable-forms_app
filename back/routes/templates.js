import { Router } from "express";
import Template from "../models/Templates.js";
import User from "../models/User.js";
import crypto from "crypto";

const templates = Router();

// ============= GET All Templates ==============
templates.get("/", (req, res) => {
  Template.findAll({
    order: ["created_at"],
    include: {
      model: User,
      required: true,
      attributes: ["email", "first_name"],
    },
  })
    .then((templates) => res.send(templates))
    .catch((err) => res.status(400).send(err));
});

// ============ GET User's Templates ============
templates.get("/user/:user_id", (req, res) => {
  const { user_id } = req.params;

  Template.findAll({ where: { user_id: user_id } })
    .then((templates) => res.send(templates))
    .catch((err) => res.status(400).send(err));
});

// ============= GET Template Info ==============
templates.get("/:hash", (req, res) => {
  const { hash } = req.params;

  Template.findOne({ where: { hash } })
    .then((template) => {
      if (template == null) throw "No template found";
      res.send({ status: "success", response: template });
    })
    .catch((err) => res.status(404).send({ status: "error", response: err }));
});

// ============= POST New Template ==============
templates.post("/new", (req, res) => {
  const { user_id } = req.body;

  Template.create({
    user_id: user_id,
    title: "New Template",
    description: "",
    image: "",
    hash: "",
  })
    .then((template) => {
      const hash = crypto
        .createHash("sha1")
        .update(`${user_id}-${template.template_id}`)
        .digest("hex");

      Template.update(
        {
          hash: hash,
        },
        { where: { template_id: template.template_id } }
      )
        .then((rows) => {
          res.send({
            status: "success",
            hash,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => res.status(400).send({ status: "error", message: err }));
});

// ========= PATCH Update Template Info =========

export default templates;
