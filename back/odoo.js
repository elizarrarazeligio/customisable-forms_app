import OdooAwait from "odoo-await";
import "dotenv/config";

const odoo = new OdooAwait({
  baseUrl: process.env.OD_HOST,
  port: undefined,
  db: process.env.OD_DB,
  username: process.env.OD_USERNAME,
  password: process.env.OD_API,
});

// Returns UID (user's ID in Odoo)
await odoo.connect();

// Read survey records by ID
const records = await odoo.read("survey.survey", 1, [
  "id",
  "display_name",
  "title",
  "user_id",
  "question_count",
  "access_mode",
  "access_token",
  "question_ids",
]);
console.log(records);

const questions = await odoo.read("survey.question", records[0].question_ids, [
  "id",
  "display_name",
  "title",
  "survey_id",
  "question_type",
  "suggested_answer_ids",
]);
console.log(questions);

// Create new survey
// const newRecord = await odoo.create("survey.survey", {
//   display_name: "Formulario de prueba",
//   title: "Formulario de prueba",
//   access_mode: "token",
// });
