import { response, Router } from "express";
import Question from "../models/Questions.js";
import Template from "../models/Templates.js";

const questions = Router();

// ========== GET Template's Questions ==========
questions.get("/:hash", (req, res) => {
  const { hash } = req.params;

  Question.findAll({
    order: ["number"],
    include: {
      model: Template,
      required: true,
      attributes: ["hash"],
      where: { hash },
    },
  })
    .then((questions) => {
      if (questions == null) throw "No questions in template.";
      res.send({ status: "success", response: questions });
    })
    .catch((err) => res.status(404).send({ status: "error", response: err }));
});

// =========== POST Add New Question ============
questions.post("/:template_id/add", (req, res) => {
  const { template_id } = req.params;
  const { number } = req.body;

  Question.create({
    template_id,
    number,
    title: "",
    description: "",
  })
    .then((question) => res.send({ status: "success", response: question }))
    .catch((err) => res.status(400).send({ status: "error", response: err }));
});

// ============== DELETE Question ===============
questions.delete("/:question_id/delete", (req, res) => {
  const { question_id } = req.params;

  Question.destroy({
    where: { question_id },
  })
    .then((row) => {
      if (row == 0) throw "Not possible to delete question, try again later.";
      res.send({
        status: "success",
        message: "Question deleted successfully!",
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

// ========= PATCH Update Question Info =========
questions.patch("/:question_id/update", (req, res) => {
  const { question_id } = req.params;
  const { field, number, title, description, show } = req.body;

  Question.update(
    { field, number, title, description, show },
    { where: { question_id } }
  )
    .then((rows) => res.send({ status: "success", affectedRows: rows[0] }))
    .catch((err) =>
      res.status(400).send({
        status: "error",
        message: "Question(s) not updated.",
        response: err,
      })
    );
});

export default questions;
