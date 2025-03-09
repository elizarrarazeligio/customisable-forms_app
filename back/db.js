import pg from "pg";
import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(process.env.DB_LOCAL_URL, {
  define: {
    timestamps: false,
  },
  dialect: "postgres",
  dialectModule: pg,
});

export default sequelize;
