import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";

const Template = sequelize.define("template", {
  template_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  private: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  allowed_users: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
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

User.hasMany(Template, {
  foreignKey: "user_id",
});
Template.belongsTo(User, { foreignKey: "user_id" });

export default Template;
