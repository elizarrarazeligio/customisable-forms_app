import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(process.env.DB_URL, {
  define: {
    timestamps: false,
  },
});

export default sequelize;
