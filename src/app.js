const express = require('express');
const app = express();
const {
  authenticationRouter,
  testRouter,
  storyRouter
} = require('./routers');
const { cors, csrfProtection, errorHandler, accessTokenCheck } = require('./middlewares');
const cookieParser = require('cookie-parser');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use(cors);
app.use(cookieParser());
app.use(express.json());
app.use('/test', testRouter);
app.get('/initialization', csrfProtection, function (req, res) {
  const token = req.csrfToken();
  res
    .status(200)
    .json({
      csrfToken: token
    });
});
app.use(accessTokenCheck);
app.use('/user', authenticationRouter);
app.use('/story', storyRouter);
app.use('/graphql', (req, res, next) => {
  return graphqlHTTP({
    schema: schema,
    graphiql: true,
    context: { req, res, next }
  })(req, res, next);
});
app.use(errorHandler);

module.exports = app;
