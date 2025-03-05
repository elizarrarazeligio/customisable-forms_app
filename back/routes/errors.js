import { Router } from "express";
import { postNewIssue } from "../jira.js";
import Template from "../models/Templates.js";
import Form from "../models/Forms.js";

const errors = Router();

// =========== POST New Error Ticket ============
errors.post("/", async (req, res) => {
  const { user, path, summary, severity } = req.body;

  let title = "";
  let hash = "";
  const pathArray = path.split("/");

  if (pathArray[1].length == 40) {
    hash = pathArray[1];
    const temp = await Template.findOne({
      where: { hash },
      attributes: ["title"],
    });
    title = `Error at Template '${temp.dataValues.title}'`;
  } else if (pathArray[2] && pathArray[2].length == 40) {
    hash = pathArray[2];
    const form = await Form.findOne({
      where: { hash },
      include: { model: Template, attributes: ["title"] },
    });
    title = `Error at Form of '${form.dataValues.template.dataValues.title}'`;
  } else {
    title = `Error at ${path}`;
  }

  res.send({ message: title });
  // postNewIssue(title, summary, severity)
  //   .then((result) =>
  //     res.send({
  //       status: "success",
  //       message: "Ticket sent succesfully!",
  //       result,
  //     })
  //   )
  //   .catch((err) => err.then((result) => res.status(400).send(result)));
});

export default errors;
