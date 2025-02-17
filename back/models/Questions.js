import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Template from "./Templates.js";

const Question = sequelize.define("question", {
  question_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  template_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  number: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  field: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Single-Line",
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  show: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Template.hasMany(Question, {
  foreignKey: "template_id",
});
Question.belongsTo(Template, { foreignKey: "template_id" });

export default Question;
