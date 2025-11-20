import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import { Order } from "./order.js"; // เชื่อมโยงกับ model ของ Orders

const Payment = sequelize.define(
  "Payment",
  {
    payment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM("credit_card", "bank_transfer", "cash_on_delivery"),
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      defaultValue: "pending",
    },
    payment_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Payments",
    timestamps: false, // ใช้ฟิลด์ที่กำหนดเองแทน `createdAt`
  }
);

// การเชื่อมโยงกับตาราง Orders
Payment.belongsTo(Order, {
  foreignKey: "order_id",
  targetKey: "order_id",
});

export { Payment };
