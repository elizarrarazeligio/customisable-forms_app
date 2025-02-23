import { Router } from "express";
import Topic from "../models/Topics.js";

const topics = Router();

// =============== GET All Topics ===============
topics.get("/", (req, res) => {
  Topic.findAll()
    .then((result) => res.send(result))
    .catch((err) => res.status(400).send(err));
});

export default topics;
