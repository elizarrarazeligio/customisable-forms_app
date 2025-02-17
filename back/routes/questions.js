import { Router } from "express";
import Question from "../models/Questions.js";

const questions = Router();

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

export default questions;
