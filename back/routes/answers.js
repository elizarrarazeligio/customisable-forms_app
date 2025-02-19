import { Router } from "express";
import Answer from "../models/Answers.js";
import Form from "../models/Forms.js";
import Template from "../models/Templates.js";
import Question from "../models/Questions.js";

const answers = Router();

// ========== POST Create Answer Input ==========
answers.post("/:form_id/add", (req, res) => {
  const { form_id } = req.params;
  const { question_id } = req.body;
  if (!form_id || !question_id)
    return res
      .status(400)
      .send({ status: "error", message: "No form or question related." });

  Answer.create({ form_id, question_id })
    .then((answer) => res.send({ status: "success", response: answer }))
    .catch((err) => res.status(400).send(err));
});

export default answers;
