const express = require('express');
const app = express();
const { loginRouter, signoutRouter } = require('./routers');
const { cors } = require('./middlewares');
const cookieParser = require('cookie-parser')

app.use(cors);
app.use(cookieParser());
app.use(express.json());
app.use('/user', loginRouter);
app.use('/user', signoutRouter);

module.exports = app;
