const express = require('express');
const app = express();
const { signInRouter, signoutRouter } = require('./routers');
const { cors } = require('./middlewares');
const cookieParser = require('cookie-parser')

app.use(cors);
app.use(cookieParser());
app.use(express.json());
app.use('/user', signInRouter);
app.use('/user', signoutRouter);

module.exports = app;
