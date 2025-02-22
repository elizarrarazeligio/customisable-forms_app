import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Checkbox from "./Checkboxes.js";
import Form from "./Forms.js";

const CheckedAnswer = sequelize.define("checkedanswer", {
  checkedanswer_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  checkbox_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  form_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  checked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Checkbox.hasMany(CheckedAnswer, { foreignKey: "checkbox_id" });
CheckedAnswer.belongsTo(Checkbox, { foreignKey: "checkbox_id" });

Form.hasMany(CheckedAnswer, { foreignKey: "form_id" });
CheckedAnswer.belongsTo(Form, { foreignKey: "form_id" });

export default CheckedAnswer;
