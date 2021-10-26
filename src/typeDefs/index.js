const typeDefs = `
type story {
  id: ID!
  userId: String,
  storyId: String,
  content: String,
  title: String
}

type storyAbstract {
  storyId: String,
  title: String
}

type userStoryMap {
  id: ID!
  userId: String,
  stories: [storyAbstract]
}

type Query {
  getStories: userStoryMap
}

schema {
  query: Query
}
`;

module.exports = typeDefs;
