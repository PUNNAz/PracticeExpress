import * as productService from "../services/productService";
import { successResponse, errorResponse } from "../middleware/responseMessage";

export async function getAllProduct(req, res) {
  try {
    const result = await productService.getAllProduct();
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}

export async function getProductByID(req, res) {
  const { id } = req.params;
  try {
    const result = await productService.getProductByID(id);
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}
export async function saveProduct(req, res) {
  const body = req.body;
  try {
    const result = await productService.saveProduct(body);
    successResponse(res, result.response, result.message);
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}
export async function deleteProduct(req, res) {
  const obj = req.body;
  try {
    const result = await productService.deleteProduct(obj.product_id);
    successResponse(
      res,
      result,
      `Product ID : ${obj.product_id} deleted successfully`
    );
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}
export async function getAveragePrice(req, res) {
  try {
    const result = await productService.getAveragePrice();
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}
export async function getMaxPriceByName(req, res) {
  try {
    const result = await productService.getMaxPriceByName();
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
}
