import { Router } from "express";
import Form from "../models/Forms.js";
import crypto from "crypto";

const forms = Router();

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

export default forms;
