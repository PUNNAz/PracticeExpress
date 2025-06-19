const { DataTypes } = require("sequelize");
const sequelize = require("../db"); 

const Customer = sequelize.define(
  "Customer",
  {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.TIMESTAMP,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Customers",
    timestamps: false, // เนื่องจากเราใช้ `created_at` แทนที่ `createdAt` ใน Sequelize
  }
);

module.exports = Customer;
