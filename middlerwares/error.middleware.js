import { ApiError } from "../utils/ApiError.js";

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

// notfound handler
export const notFound = (req,res, next)=>{
  const error = new ApiError(404, `Not found - ${req.originalUrl}`)
  next(error)
}
