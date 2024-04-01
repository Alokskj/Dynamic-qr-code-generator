export const globalErrorHandler = (err, req, res, next) => {
  console.log(err)
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    status: status,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};
