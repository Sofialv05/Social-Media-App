const typeDefs = `#graphql

type Follow {
    _id: String
    followingId: String
    followerId: String
    createdAt: String
    updatedAt: String
}

type Follower {
    _id: String
    followingId: String
    followerId: String
    follower: User
    createdAt: String
    updatedAt: String
}

type Following {
    _id: String
    followingId: String
    following: User
    followerId: String
    createdAt: String
    updatedAt: String
}

type User {
    username: String
}

input NewFollow {
    followingId: String!
}

type Message {
    message: String!
}

type Query {
    findAllFollowers: [Follower]
    findAllFollowing: [Following]
}

type Mutation {
    followUser(inputFollow: NewFollow): Message

}
`;

export default typeDefs;
