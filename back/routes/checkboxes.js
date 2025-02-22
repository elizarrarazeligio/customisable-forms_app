import { Router } from "express";
import Checkbox from "../models/Checkboxes.js";

const checkboxes = Router();

// ======= GET Checkboxes By Question ID ========
checkboxes.get("/question/:question_id", (req, res) => {
  const { question_id } = req.params;

  Checkbox.findAll({ where: { question_id }, order: [["checkbox_id"]] })
    .then((checkboxes) => {
      if (checkboxes.length == 0) throw "No checkboxes in question.";
      res.send({ status: "success", response: checkboxes });
    })
    .catch((err) => res.status(404).send({ status: "error", message: err }));
});

// ========== POST New Empty Checkbox ===========
checkboxes.post("/question/:question_id/new", (req, res) => {
  const { question_id } = req.params;

  Checkbox.create({ question_id })
    .then((checkbox) => res.send({ status: "success", response: checkbox }))
    .catch((err) =>
      res.status(404).send({ status: "error", message: err.parent.detail })
    );
});

// =========== PATCH Checkbox Option ============
checkboxes.patch("/:checkbox_id/update", (req, res) => {
  const { checkbox_id } = req.params;
  const { option } = req.body;
  if (!option)
    res
      .status(400)
      .send({ status: "error", message: "Fields required not filled." });

  Checkbox.update({ option }, { where: { checkbox_id } })
    .then((rows) => res.send({ status: "success", affectedRows: rows[0] }))
    .catch((err) => res.status(400).send(err));
});

// =========== PATCH Checkbox Status ============
checkboxes.patch("/:checkbox_id/checked", (req, res) => {
  const { checkbox_id } = req.params;
  const { checked } = req.body;

  Checkbox.update({ checked }, { where: { checkbox_id } })
    .then((rows) => res.send({ status: "success", affectedRows: rows[0] }))
    .catch((err) => res.status(400).send(err));
});

// ============== DELETE Checkbox ===============
checkboxes.delete("/:checkbox_id/delete", (req, res) => {
  const { checkbox_id } = req.params;

  Checkbox.destroy({ where: { checkbox_id } })
    .then((checkbox) => {
      if (!checkbox) throw "No checkbox found to delete";
      res.send({ status: "success", deletedRows: checkbox });
    })
    .catch((err) => res.status(404).send({ status: "error", message: err }));
});

export default checkboxes;
