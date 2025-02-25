import { Router } from "express";
import Comment from "../models/Comments.js";
import User from "../models/User.js";

const comments = Router();

// =========== GET Template Comments ============
comments.get("/template/:template_id", (req, res) => {
  const { template_id } = req.params;

  Comment.findAll({
    where: { template_id },
    include: {
      model: User,
      required: true,
      attributes: ["first_name", "last_name"],
    },
    order: [["created_at", "ASC"]],
  })
    .then((comments) => {
      if (comments.length == 0) throw "No comments found.";
      res.send({ status: "success", response: comments });
    })
    .catch((err) => res.status(404).send({ status: "error", message: err }));
});

// ============== POST New Comment ==============
comments.post("/template/:template_id/add", (req, res) => {
  const { template_id } = req.params;
  const { description, user_id } = req.body;
  if (!description || !user_id) {
    res
      .status(400)
      .send({ status: "error", message: "There can't be empty comments." });
  }

  Comment.create({ template_id, user_id, description })
    .then((comment) => res.send({ status: "success", response: comment }))
    .catch((err) =>
      res.status(400).send({ status: "error", message: err.parent.detail })
    );
});

// ============ DELETE Comment By Id ============
comments.delete("/:comment_id/delete", (req, res) => {
  const { comment_id } = req.params;

  Comment.destroy({ where: { comment_id } })
    .then((row) => {
      if (!row) throw "No comment to delete.";
      res.send({ status: "success", affectedRows: row });
    })
    .catch((err) => res.status(404).send({ status: "error", message: err }));
});

export default comments;
