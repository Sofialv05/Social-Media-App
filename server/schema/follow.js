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

type Message {
    message: String!
}

type Mutation {
    followUser(inputFollow: NewFollow): Message
}
`;

export default typeDefs;
