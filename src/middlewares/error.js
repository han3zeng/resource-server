// the graphql server handle the error for you
// function errorHandler (err, req, res, next) {
//   if (res.headersSent) {
//     return next(err);
//   }
//   res
//     .status(500)
//     .json({
//       stackTrace: err.stack,
//       message: `${err.message}`
//     });
// }

function errorHandler (err, req, res, next) {
  console.log('err: ', err)
}

module.exports = errorHandler;
