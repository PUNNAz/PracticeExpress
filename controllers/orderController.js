import { errorResponse, successResponse } from "../middleware/responseMessage";
import * as orderService from "../services/orderService";

export async function getOrderById(req, res) {
  const { id } = req.params;

  try {
    const result = await orderService.getOrderById(id);
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
}

export async function saveOrder(req, res) {
  const body = req.body;
  try {
    const result = await orderService.saveOrder(body);
    successResponse(
      res,
      result,
      `Product ID :  ${result.order_id}  insert successfully`
    );
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
}

export async function updateStatus(req, res) {
  const body = req.body;
  try {
    const result = await orderService.updateStatus(body);
    successResponse(
      res,
      result,
      `Order ID :  ${result.order_id}  Status update`
    );
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
}

export async function deleteOrder(req, res) {
  const id = req.body.id;
  try {
    const result = await orderService.deleteOrder(id);
    successResponse(res, result, `Order ID :  ${result.order_id}  Delete`);
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}

export async function getOrderAndCustomer(req, res) {
  const { id } = req.params;
  try {
    const result = await orderService.getOrderAndCustomer(id);
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}
