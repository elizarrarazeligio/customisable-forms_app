import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";

const Context = sequelize.define("context", {
  context_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  theme: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "light",
  },
});

User.hasMany(Context, { foreignKey: "user_id" });
Context.belongsTo(User, { foreignKey: "user_id" });

export default Context;
