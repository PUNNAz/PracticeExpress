import * as paymentService from "../services/paymentService.js";
import {
  successResponse,
  errorResponse,
} from "../middleware/responseMessage.js";

export async function getAllPaymentsController(req, res) {
  try {
    const payments = await paymentService.getAllPayments();
    successResponse(res, payments);
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}

export async function getPaymentByIdController(req, res) {
  const { paymentId } = req.params;
  try {
    const payment = await paymentService.getPaymentById(paymentId);
    successResponse(res, payment);
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}

export async function createPaymentController(req, res) {
  const paymentData = req.body;
  try {
    const payment = await paymentService.createPayment(paymentData);
    successResponse(res, payment, "Payment created successfully");
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}

export async function updatePaymentController(req, res) {
  const { paymentId } = req.params;
  const paymentData = req.body;
  try {
    const payment = await paymentService.updatePayment(paymentId, paymentData);
    successResponse(res, payment, "Payment updated successfully");
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}

export async function deletePaymentController(req, res) {
  const { paymentId } = req.params;
  try {
    const result = await paymentService.deletePayment(paymentId);
    successResponse(res, result, "Payment deleted successfully");
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}

export async function getPaymentsByOrderIdController(req, res) {
  const { orderId } = req.params;
  try {
    const payments = await paymentService.getPaymentsByOrderId(orderId);
    successResponse(res, payments);
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}