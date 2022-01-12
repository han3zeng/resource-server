const { graphqlHTTP } = require('express-graphql');
const typeDefs = require('../graph-q-l/type-defs');
const resolvers = require('../graph-q-l/resolvers');
const { makeExecutableSchema } = require('graphql-tools');
const config = require('../config');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

function graphql (req, res, next) {
  return graphqlHTTP({
    schema: schema,
    graphiql: config.nodeEnv !== 'production',
    context: {
      req,
      res,
      next
    }
  })(req, res);
}

module.exports = graphql;
