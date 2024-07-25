const typeDefs = `#graphql
  type User {
    _id: String
    name: String
    username: String
    email: String
    password: String
  }

  input NewUser {
    name: String! 
    username: String! 
    email: String!
    password: String!
  }

  input LoginUser {
    username: String! 
    password: String!
  }

  type Token {
    token: String
    username: String
  }
 
  type Message {
    message: String
  }

  type Query {
    findUsers(search: String): [User]
    findUserById(userId: String!): User
    findUserProfile: User
  }

  type Mutation {
    register(inputUser: NewUser): Message
    login(inputLogin: LoginUser): Token
  }
`;

export default typeDefs;
