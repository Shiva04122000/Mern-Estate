export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err?.statusCode || 500;
  const message = err?.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

class errorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default errorHandler;
