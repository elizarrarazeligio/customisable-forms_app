import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Topic = sequelize.define("topic", {
  topic_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Topic;
