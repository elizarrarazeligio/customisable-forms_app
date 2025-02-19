import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Form from "./Forms.js";
import Question from "./Questions.js";

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
    defaultValue: "",
  },
});

Form.hasMany(Answer, { foreignKey: "form_id" });
Answer.belongsTo(Form, { foreignKey: "form_id" });

Question.hasMany(Answer, { foreignKey: "question_id" });
Answer.belongsTo(Question, { foreignKey: "question_id" });

export default Answer;
