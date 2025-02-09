import express from "express";
import cors from "cors";
import users from "./routes/users";
import templates from "./routes/templates";
import forms from "./routes/forms";
import "dotenv/config";

const app = express();

const allowedOrigins = ["http://localhost:3005"];
app.use(cors({ origin: allowedOrigins }));

app.use("/users", users);
app.use("/templates", templates);
app.use("/forms", forms);

app.listen(process.env.API_PORT, () => {
  console.log("App listening at port:", process.env.API_PORT);
});
