const typeDefs = `#graphql

type Follow {
    _id: String
    followingId: String
    followerId: String
    createdAt: String
    updatedAt: String
}

input NewFollow {
    followingId: String!
}

type Mutation {
    followUser(inputFollow: NewFollow): Follow
}
`;

export default typeDefs;
