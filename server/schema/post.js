const typeDefs = `#graphql
type Post {
    _id: String
    content: String
    tags: [String]
    imgUrl: String
    authorId: String
    author: Author
    comments: [Comment]
    likes: [Like]
}

type Author {
    name: String
    username: String,
    email: String,
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

type Query {
    findPosts(search: String): [Post]
    findPostById(postId: String!): Post
    findPostByAuthorId: [Post]
}

type Mutation {
    addPost(inputPost: NewPost): Message
    commentPost(inputComment: NewComment): Post
    likePost(inputLike: NewLike): Post
}
`;

export default typeDefs;
