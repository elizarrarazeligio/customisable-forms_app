import { Router } from "express";
import Template from "../models/Templates.js";

const templates = Router();

templates.get("/", (req, res) => {
  Template.findAll()
    .then((templates) => res.send(templates))
    .catch((err) => res.status(400).send(err));
});

export default templates;
