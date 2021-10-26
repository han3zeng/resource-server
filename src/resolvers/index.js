const getStories = require('./stories');

const resolvers = {
  Query: {
    getStories
  }
};

module.exports = resolvers;
