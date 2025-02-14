import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Form = sequelize.define("form", {
  form_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  template_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  topic_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Form;
