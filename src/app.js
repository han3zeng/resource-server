const express = require('express');
const app = express();
const {
  authenticationRouter,
  testRouter,
  storyRouter
} = require('./routers');
const {
  cors,
  csrfProtection,
  errorHandler,
  accessTokenCheck,
  initialization,
  graphql
} = require('./middlewares');
const cookieParser = require('cookie-parser');

app.use(cors);
app.use(cookieParser());
app.use(express.json());
app.use('/test', testRouter);
app.use(csrfProtection);
app.get('/initialization', initialization);
app.use('/user', accessTokenCheck, authenticationRouter);
// app.use('/story', storyRouter);
app.use('/graphql', accessTokenCheck, graphql);
app.use(errorHandler);

module.exports = app;
