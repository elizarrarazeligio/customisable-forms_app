import { Router } from "express";
import { Sequelize } from "sequelize";
import Template from "../models/Templates.js";
import User from "../models/User.js";
import Question from "../models/Questions.js";
import crypto from "crypto";
import Form from "../models/Forms.js";
import Checkbox from "../models/Checkboxes.js";
import Answer from "../models/Answers.js";
import Comment from "../models/Comments.js";
import lunr from "lunr";

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

// ========== GET Templates By Search ===========
templates.get("/search", (req, res) => {
  const { search } = req.query;

  Template.findAll({
    attributes: ["template_id", "title", "description"],
    include: [
      { model: Question, attributes: ["template_id", "description"] },
      { model: Comment, attributes: ["template_id", "description"] },
    ],
  })
    .then((templates) => {
      const index = lunr(function () {
        this.field("title");
        this.field("description");
        this.ref("template_id");

        templates.forEach((template) => {
          this.add(template);
          template.questions.forEach((question) => this.add(question));
          template.comments.forEach((comment) => this.add(comment));
        });
      });
      const refs = index.search(search).map((i) => parseInt(i.ref));
      res.send(refs);
    })
    .catch((err) => res.status(500).send(err));
});

// ======== GET Most Answered Templates =========
templates.get("/popular", (req, res) => {
  Template.findAll({
    attributes: [
      "template_id",
      "title",
      "image",
      "hash",
      [
        Sequelize.literal(
          "(SELECT COUNT(*) FROM forms WHERE template.template_id = forms.template_id)"
        ),
        "forms",
      ],
    ],
    include: {
      model: User,
      required: true,
      attributes: ["first_name", "email"],
    },
    order: [["forms", "DESC"]],
    limit: 5,
  })
    .then((templates) => res.send(templates))
    .catch((err) => res.status(400).send(err));
});

// ============ GET User's Templates ============
templates.get("/user/:user_id", (req, res) => {
  const { user_id } = req.params;

  Template.findAll({
    order: [["created_at", "DESC"]],
    where: { user_id: user_id },
  })
    .then((templates) => res.send(templates))
    .catch((err) => res.status(400).send(err));
});

// ============= GET Template Info ==============
templates.get("/:hash", (req, res) => {
  const { hash } = req.params;

  Template.findOne({
    include: {
      model: Question,
      required: true,
      attributes: ["question_id", "description", "show", "field"],
      include: {
        model: Checkbox,
        separate: true,
        attributes: ["checkbox_id"],
        order: [["checkbox_id"]],
      },
    },
    order: [[Question, "number"]],
    where: { hash },
  })
    .then((template) => {
      if (template == null) throw "No template found";
      res.send({ status: "success", response: template });
    })
    .catch((err) => res.status(404).send({ status: "error", response: err }));
});

// ============ GET Template Answers ============
templates.get("/:hash/answers", (req, res) => {
  const { hash } = req.params;

  Template.findOne({
    include: {
      model: Question,
      required: true,
      attributes: ["question_id", "field", "description"],
      include: [
        { model: Answer, attributes: ["answer"] },
        {
          model: Checkbox,
          separate: true,
          attributes: [
            "option",
            [
              Sequelize.literal(
                "(SELECT COUNT(*) FROM checkedanswers WHERE checked = true AND checkbox_id = checkbox.checkbox_id)"
              ),
              "count",
            ],
          ],
        },
      ],
    },
    attributes: ["template_id", "title"],
    where: { hash },
    order: [[Question, "number"]],
  })
    .then((template) => res.send({ status: "success", response: template }))
    .catch((err) => res.status(404).send({ status: "error", response: err }));
});

// ============= GET Template Forms =============
templates.get("/:hash/forms", (req, res) => {
  const { hash } = req.params;

  Template.findAll({
    include: {
      model: Form,
      required: true,
      attributes: ["created_at", "hash"],
      include: {
        model: User,
        required: true,
        attributes: ["first_name", "last_name", "email"],
      },
    },
    attributes: ["template_id", "user_id"],
    where: { hash },
    order: [[Form, "created_at"]],
  })
    .then((forms) => {
      if (forms.length == 0) throw "No template forms found.";
      res.send({ status: "success", response: forms[0] });
    })
    .catch((err) => res.send({ status: "error", response: err }));
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
  const { title, description, image, priv, allowedUsers } = req.body;

  Template.update(
    {
      title,
      description,
      image,
      private: priv,
      allowed_users: allowedUsers,
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
