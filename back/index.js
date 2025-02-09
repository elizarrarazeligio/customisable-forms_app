import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

const allowedOrigins = ["http://localhost:3005"];
app.use(cors({ origin: allowedOrigins }));

app.listen(process.env.API_PORT, () => {
  console.log("App listening at port:", process.env.API_PORT);
});
