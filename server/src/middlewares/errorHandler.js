import { ValidationError as SequelizeValidationError } from "@sequelize/core";

const errorHandler = (err, req, res, next) => {
  console.error(`[${err.name}] ${err.message}`);

  // Sequelize validation
  if (err instanceof SequelizeValidationError) {
    return res.status(400).json({
      success: false,
      error: {
        name: err.name,
        message: "Sequelize validation error",
        details: err.errors.map((e) => ({
          field: e.path,
          message: e.message,
        })),
      },
    });
  }

  const status = err.statusCode || 500;
  const message = status === 500 ? "Internal Server Error" : err.message;

  res.status(status).json({
    success: false,
    error: {
      name: err.name,
      message,
    },
  });
};

export default errorHandler;
