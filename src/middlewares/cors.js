const allowedOrigins = require('../config').allowedOrigins;

const cors = (req, res, next) => {
  const requsterOrigin = req.get('Origin');
  if (allowedOrigins.indexOf(requsterOrigin) > -1) {
    res.header('Access-Control-Allow-Origin', requsterOrigin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
};

module.exports = cors;
