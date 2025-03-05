import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import users from "./routes/users.js";
import templates from "./routes/templates.js";
import forms from "./routes/forms.js";
import answers from "./routes/answers.js";
import comments from "./routes/comments.js";
import questions from "./routes/questions.js";
import topics from "./routes/topics.js";
import checkboxes from "./routes/checkboxes.js";
import contexts from "./routes/contexts.js";
import likes from "./routes/likes.js";
import errors from "./routes/errors.js";
import "dotenv/config";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://customisable-forms-app-front.vercel.app",
];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(bodyParser.json({ origin: allowedOrigins }));
app.use(cookieParser());

app.use("/users", users);
app.use("/templates", templates);
app.use("/forms", forms);
app.use("/answers", answers);
app.use("/comments", comments);
app.use("/questions", questions);
app.use("/checkboxes", checkboxes);
app.use("/topics", topics);
app.use("/likes", likes);
app.use("/contexts", contexts);
app.use("/errors", errors);

app.listen(process.env.API_PORT, () => {
  console.log("App listening at port:", process.env.API_PORT);
});
