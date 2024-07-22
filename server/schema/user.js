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
 
  type Query {
    findUsers: [User]
  }

  type Mutation {
    register(inputUser: NewUser): User
    login(inputLogin: LoginUser): Token
  }
`;

export default typeDefs;
