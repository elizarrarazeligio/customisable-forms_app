import { Router } from "express";
import { getPermissions, postNewIssueOAuth } from "../jira.js";
import Template from "../models/Templates.js";
import Form from "../models/Forms.js";

const errors = Router();

// ============ POST Get Permissions ============
errors.post("/", async (req, res) => {
  const { code } = req.body;

  await getPermissions(code)
    .then((result) =>
      res.send({
        status: "success",
        result,
      })
    )
    .catch((err) => res.send(err));
});

// =========== POST New Error Ticket ============
errors.post("/ticket", async (req, res) => {
  const { path, summary, severity, permissions } = req.body;

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

  await postNewIssueOAuth(title, summary, severity, permissions)
    .then((result) =>
      res.send({
        status: "success",
        message: "Ticket sent succesfully!",
        result,
      })
    )
    .catch((err) => res.status(400).send(err));
});

export default errors;
