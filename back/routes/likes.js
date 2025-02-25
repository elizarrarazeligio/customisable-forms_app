import { Router } from "express";
import Like from "../models/Likes.js";

const likes = Router();

// ============= GET Template Likes =============
likes.get("/template/:template_id", (req, res) => {
  const { template_id } = req.params;

  Like.findAll({ where: { template_id } })
    .then((likes) => res.send({ status: "success", likes }))
    .catch((err) =>
      res.status(400).send({ status: "error", message: "No likes to show." })
    );
});

// =============== PUT User Like ================
likes.put("/template/:template_id/like", (req, res) => {
  const { template_id } = req.params;
  const { user_id } = req.body;

  Like.findOrCreate({ where: { template_id, user_id } })
    .then((like) => res.send({ status: "success", response: like[0] }))
    .catch((err) => res.status(400).send({ status: "error", message: err }));
});

// ============== DELETE User Like ==============
likes.delete("/:like_id/remove", (req, res) => {
  const { like_id } = req.params;

  Like.destroy({ where: { like_id } })
    .then((row) => {
      if (!row) throw "No like to delete.";
      res.send({ status: "success", affectedRows: row });
    })
    .catch((err) => res.status(404).send({ status: "error", message: err }));
});

export default likes;
