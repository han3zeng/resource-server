const express = require('express');
const app = express();
const {
  authenticationRouter,
  testRouter,
  storyRouter
} = require('./routers');
const { cors, csrfProtection, errorHandler, accessTokenCheck, initialization } = require('./middlewares');
const cookieParser = require('cookie-parser');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./graph-q-l/type-defs');
const resolvers = require('./graph-q-l/resolvers');
const config = require('./config');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use(cors);
app.use(cookieParser());
app.use(express.json());
app.use('/test', testRouter);
app.use(csrfProtection);
app.get('/initialization', initialization);
app.use('/user', accessTokenCheck, authenticationRouter);
// app.use('/story', storyRouter);
app.use('/graphql', accessTokenCheck, (req, res, next) => {
  return graphqlHTTP({
    schema: schema,
    graphiql: config.nodeEnv !== 'production',
    context: { req, res, next }
  })(req, res, next);
});
app.use(errorHandler);

module.exports = app;
