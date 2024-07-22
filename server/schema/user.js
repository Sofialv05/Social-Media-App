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
 
  type Query {
    findUsers: [User]
  }

  type Mutation {
    register(inputUser: NewUser): User
  }
`;

export default typeDefs;
