import { Router } from "express";
import Answer from "../models/Answers.js";

const answers = Router();

// =========== GET Question's Answers ===========
answers.get("/question/:question_id", (req, res) => {
  const { question_id } = req.params;

  Answer.findAll;
});

// ========= GET Form's Question Answer =========
answers.get("/form/:form_id/question/:question_id", (req, res) => {
  const { form_id, question_id } = req.params;

  Answer.findAll({ where: { form_id, question_id } })
    .then((answer) => {
      if (answer.length == 0) throw "No answer in question.";
      res.send({ status: "success", response: answer[0] });
    })
    .catch((err) => res.status(404).send({ status: "error", response: err }));
});

// ========== POST Create Answer Input ==========
answers.post("/form/:form_id/add", (req, res) => {
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
