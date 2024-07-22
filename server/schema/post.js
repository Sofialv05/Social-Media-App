const typeDefs = `#graphql
type Comment {
    content: String
    username: String
    createdAt: String
    updatedAt: String
}

type Like {
    username: String
    createdAt: String
    updatedAt: String
}

type Post {
    _id: String
    content: String
    tags: [String]
    imgUrl: String
    authorId: String
    comments: [Comment]
    likes: [Like]
}
`;

export default typeDefs;
