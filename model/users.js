import { DataTypes } from "sequelize";
import sequelize from "../db";

const Users = sequelize.define(
  "User",
  {
    UID: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false, // ปิดการสร้าง createdAt, updatedAt อัตโนมัติ
  }
);
export { Users };
