const typeDefs = `#graphql
type Post {
    _id: String
    content: String
    tags: [String]
    imgUrl: String
    authorId: String
    comments: [Comment]
    likes: [Like]
}

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

type Query {
    findPosts: [Post]
}

input NewPost {
    content: String!
    tags: [String]!
    imgUrl: [String]!
    authorId: String!
}

input NewComment {
    content: String!
    username: String!
}

input NewLike {
    username: String!
}

type Mutation {
    addPost(inputPost: NewPost): Post
    commentPost(inputComment: NewComment): Post
    likePost(inputLike: NewLike): Post
}
`;

export default typeDefs;
