const express = require('express');
const app = express();
const { signInRouter, signoutRouter, testRouter } = require('./routers');
const { cors, csrfProtection } = require('./middlewares');
const cookieParser = require('cookie-parser');

app.use(cors);
app.use(cookieParser());
app.use(express.json());
app.get('/initialization', csrfProtection, function (req, res) {
  const token = req.csrfToken();
  res.json({
    csrfToken: token
  });
});
app.use('/user', signInRouter);
app.use('/user', signoutRouter);
app.use('/test', testRouter);

module.exports = app;
