import { Payment } from "../model/payment.js";
import { Op } from "sequelize";

export async function getAllPayments() {
  const payments = await Payment.findAll();
  return payments;
}

export async function getPaymentById(paymentId) {
  const payment = await Payment.findByPk(paymentId);
  if (!payment) {
    throw new Error("Payment not found");
  }
  return payment;
}

export async function createPayment(paymentData) {
  const payment = await Payment.create(paymentData);
  return payment;
}

export async function updatePayment(paymentId, paymentData) {
  const payment = await Payment.findByPk(paymentId);
  if (!payment) {
    throw new Error("Payment not found");
  }
  await payment.update(paymentData);
  return payment;
}

export async function deletePayment(paymentId) {
  const payment = await Payment.findByPk(paymentId);
  if (!payment) {
    throw new Error("Payment not found");
  }
  await payment.destroy();
  return { message: "Payment deleted successfully" };
}

export async function getPaymentsByOrderId(orderId) {
  const payments = await Payment.findAll({
    where: { order_id: orderId },
  });
  return payments;
}