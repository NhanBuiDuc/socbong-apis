// response.js

// Function to send a success JSON response
function sendSuccessResponse(res, data, message = "Success", statusCode = 200) {
  res.status(statusCode).json({
    status: "success",
    data,
    message,
  });
}

// Function to send an error JSON response
function sendErrorResponse(
  res,
  message = "Internal Server Error",
  statusCode = 500
) {
  res.status(statusCode).json({
    status: "error",
    message,
  });
}

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
};
