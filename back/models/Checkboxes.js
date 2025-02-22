import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Question from "./Questions.js";

const Checkbox = sequelize.define("checkbox", {
  checkbox_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  option: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  checked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Question.hasMany(Checkbox, { foreignKey: "question_id" });
Checkbox.belongsTo(Question, { foreignKey: "question_id" });

export default Checkbox;
