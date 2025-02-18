import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";
import Template from "./Templates.js";
import Topic from "./Topics.js";

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

User.hasMany(Form, { foreignKey: "user_id" });
Form.belongsTo(User, { foreignKey: "user_id" });

Template.hasMany(Form, { foreignKey: "template_id" });
Form.belongsTo(Template, { foreignKey: "template_id" });

Topic.hasMany(Form, { foreignKey: "topic_id" });
Form.belongsTo(Topic, { foreignKey: "topic_id" });

export default Form;
