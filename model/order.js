import { DataTypes } from "sequelize";
import sequelize from "../db";
import { Customer } from "./customer";

const Order = sequelize.define(
  "Order",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled"
      ),
      defaultValue: "pending",
    },
  },
  {
    tableName: "Orders",
    timestamps: false, // เนื่องจากใช้ `order_date` แทน `createdAt` ใน Sequelize
  }
);

// การเชื่อมโยงกับตาราง Customers
Order.belongsTo(Customer, {
  foreignKey: "customer_id",
  targetKey: "customer_id",
});

export { Order };
