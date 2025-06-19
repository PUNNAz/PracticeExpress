const sendResponse = (res, responseCode, message, data = null) => {
  return res.status(responseCode).json({
    responseCode,
    message,
    data,
  });
};

const successResponse = (res, data, message = "get Data Success") => {
  return sendResponse(res, 200, message, data);
};

const errorResponse = (res, responseCode, message = "Error") => {
  return sendResponse(res, responseCode, message);
};

export { successResponse, errorResponse };
