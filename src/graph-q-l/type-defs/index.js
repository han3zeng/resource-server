const typeDefs = `
type leaf {
  text: String!
  italic: Boolean,
  bold: Boolean,
}

union Children = leaf | storyNode

type storyNode {
  type: String!,
  url: String,
  children: [Children]
}

type story {
  id: ID!
  userId: String,
  storyId: String,
  content: [storyNode],
  title: String
}

type storyAbstract {
  storyId: String,
  title: String
}

type userStories {
  id: ID!
  userId: String,
  stories: [storyAbstract]
}

type Query {
  getStories: userStories
  getStory(storyId: String!): story
}

schema {
  query: Query
}
`;

module.exports = typeDefs;
