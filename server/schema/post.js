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
    findPost: Post
}

input NewPost {
    content: String!
    tags: [String]!
    imgUrl: String!
}

input NewComment {
    content: String!
    postId: String!
}

input NewLike {
    postId: String!
}

type Message {
    message: String!
}

type Mutation {
    addPost(inputPost: NewPost): Message
    commentPost(inputComment: NewComment): Post
    likePost(inputLike: NewLike): Post
}
`;

export default typeDefs;
