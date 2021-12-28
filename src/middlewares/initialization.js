async function initialization (req, res, next) {
  const token = req.csrfToken();
  res
    .status(200)
    .json({
      csrfToken: token
    });
}

module.exports = initialization;
