function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res
    .status(500)
    .json({
      stackTrace: err.stack,
      message: `${err.message}`
    });
}

module.exports = errorHandler;
