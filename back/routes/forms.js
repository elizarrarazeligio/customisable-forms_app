import { Router } from "express";
import Form from "../models/Forms.js";
import crypto from "crypto";
import Template from "../models/Templates.js";
import Question from "../models/Questions.js";
import User from "../models/User.js";

const forms = Router();

// ============== GET User's Forms ==============
forms.get("/user/:user_id", (req, res) => {
  const { user_id } = req.params;

  Form.findAll({
    order: ["created_at"],
    where: { user_id },
    include: { model: Template, required: true, attributes: ["title"] },
  })
    .then((forms) => res.send(forms))
    .catch((err) => res.status(400).send(err));
});

// =============== GET Form Info ================
forms.get("/:hash", (req, res) => {
  const { hash } = req.params;

  Form.findOne({
    where: { hash },
    include: [
      { model: User, required: true, attributes: ["email"] },
      {
        model: Template,
        required: true,
        attributes: ["title", "description"],
        include: {
          model: Question,
          required: true,
          attributes: ["description", "field"],
          where: { show: true },
        },
      },
    ],
  })
    .then((form) => {
      if (form == null) throw "No form found";
      res.send({ status: "success", response: form });
    })
    .catch((err) => res.status(404).send({ status: "error", response: err }));
});

// =============== POST New Form ================
forms.post("/new", (req, res) => {
  const { template_id, user_id, image } = req.body;

  Form.create({
    template_id,
    user_id,
    topic_id: 2,
    image,
    tags: [],
    hash: "",
  })
    .then((form) => {
      const hash = crypto
        .createHash("sha1")
        .update(`${user_id}-${template_id}-${form.form_id}`)
        .digest("hex");

      Form.update(
        {
          hash,
        },
        { where: { form_id: form.form_id } }
      )
        .then((rows) => {
          res.send({
            status: "success",
            message: "New form created!",
            hash,
            form_id: form.form_id,
          });
        })
        .catch((err) => res.status(400).send(err));
    })
    .catch((err) => res.status(400).send({ status: "error", message: err }));
});

// ================ DELETE Form =================
forms.delete("/:form_id/delete", (req, res) => {
  const { form_id } = req.params;

  Form.destroy({
    where: { form_id },
  })
    .then((row) => {
      if (row == 0) throw "Not possible to delete form, try again later.";
      res.send({
        status: "success",
        message: "Form deleted successfully!",
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

export default forms;
