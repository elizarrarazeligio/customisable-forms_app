import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(process.env.DB_URL);

try {
  await sequelize.authenticate();
  console.log("DB connection succesful!");
} catch (error) {
  console.error("Unable to connect:", error);
}

export default sequelize;
