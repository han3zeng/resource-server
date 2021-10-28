const typeDef = `
  type storyAbstract {
    storyId: String,
    title: String
  }

  type userStories {
    id: ID!
    userId: String,
    stories: [storyAbstract]
  }
`;

module.exports = typeDef;
