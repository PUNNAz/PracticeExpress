import * as customerService from "../services/customerService";
import { errorResponse, successResponse } from "../middleware/responseMessage";

export async function getCustomerById(req, res) {
  const { id } = req.params;
  try {
    const result = await customerService.getCustomerById(id);
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
}

export async function registerCustomer(req, res) {
  const body = req.body;
  try {
    const result = await customerService.registerCustomer(body);
    successResponse(
      res,
      result,
      `Customer ID : ${result.customer_id} insert successfully`
    );
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
}

export async function updateCustomer(req, res) {
  const body = req.body;
  console.log("🚀 ~ updateCustomer ~ body:", body)
  try {
    const result = await customerService.updateCustomer(body);
    successResponse(
      res,
      result,
      `Customer ID : ${result.customer_id} update successfully`
    );
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
}

export async function deleteCustomer(req, res) {
  const body = req.body;
  try {
    const result = await customerService.deleteCustomer(body);
    successResponse(
      res,
      result,
      `Customer ID : ${result.customer_id} delete successfully`
    );
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
}
