const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational Error not caused by us
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //logging the Error to the console.
    console.error(err);

    //Programming or other error that client shouldn't know
    res.status(500).json({
      status: 'Error',
      message: 'Something Went Wrong!',
    });
  }
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  // console.log(value)
  const message = `Duplicate field value:${value} Please use a unique value`;
  return new AppError(message, 400);
};

const handleJWTError = (err) => {
  return new AppError('Invalid Credentials, Please log in again!', 401);
};

const handleJWTExpiredError = (err) => {
  return new AppError('Invalid Credentials, Please log in again', 401);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((val) => {
    return val.message;
  });
  const message = `Invalid input data. ${error.join('. ')}`;
  return new AppError(message, 400);
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }

    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError(error);
    }
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError;
    sendErrorProd(error, res);
  }
};
