import { Router } from "express";
import Template from "../models/Templates.js";
import User from "../models/User.js";
import crypto from "crypto";

const templates = Router();

// ============= GET All Templates ==============
templates.get("/", (req, res) => {
  Template.findAll({
    order: [["created_at", "DESC"]],
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

  Template.findAll({ order: ["created_at"], where: { user_id: user_id } })
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
            message: "New template created!",
            hash,
            template_id: template.template_id,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => res.status(400).send({ status: "error", message: err }));
});

// ========= PATCH Update Template Info =========
templates.patch("/:hash/update", (req, res) => {
  const { hash } = req.params;
  const { title, description, image } = req.body;

  Template.update(
    {
      title,
      description,
      image,
    },
    { where: { hash } }
  )
    .then((rows) => {
      if (rows[0] == 0) throw "No changes made.";
      res.send({
        status: "success",
        message: "Template updated succesfully!",
        affectedRows: rows[0],
      });
    })
    .catch((err) => res.status(400).send({ status: "error", message: err }));
});

// ============== DELETE Template ===============
templates.delete("/:template_id/delete", (req, res) => {
  const { template_id } = req.params;

  Template.destroy({
    where: { template_id },
  })
    .then((row) => {
      if (row == 0) throw "Not possible to delete template, try again later.";
      res.send({
        status: "success",
        message: "Template deleted successfully!",
        affectedRows: row,
      });
    })
    .catch((err) =>
      res.status(400).send({
        status: "error",
        message: err,
      })
    );
});

export default templates;
