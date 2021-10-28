const getStories = require('./getStories');
const getStory = require('./getStory');
const createStory = require('./createStory');
const base = `
  type Query {
    getStories: userStories
    getStory(storyId: String!): story
  }

  type Mutation {
    createStory(content: String, title: String): createStoryResult
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const data = [
  createStory,
  getStories,
  getStory,
  base
];

const concat = ({
  data
}) => {
  return data.reduce((acc, element) => {
    return acc + element;
  }, '');
};

module.exports = concat({ data });
