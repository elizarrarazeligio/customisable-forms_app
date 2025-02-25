import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";
import Template from "./Templates.js";

const Comment = sequelize.define("comment", {
  comment_id: {
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
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
  },
});

User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

Template.hasMany(Comment, { foreignKey: "template_id" });
Comment.belongsTo(Template, { foreignKey: "template_id" });

export default Comment;
