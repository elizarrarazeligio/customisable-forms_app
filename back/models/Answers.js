import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Answer = sequelize.define("answer", {
  answer_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  form_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Answer;
