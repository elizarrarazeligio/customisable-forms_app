import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";
import Template from "./Templates.js";

const Like = sequelize.define("like", {
  like_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  template_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Template.hasMany(Like, { foreignKey: "template_id" });
Like.belongsTo(Template, { foreignKey: "template_id" });

User.hasMany(Like, { foreignKey: "user_id" });
Like.belongsTo(User, { foreignKey: "user_id" });

export default Like;
