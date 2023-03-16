const { gql } = require("apollo-server-express");

// Check if it should be "Number" or "Int" for data type
// Refer to 21-Mern (Module 24)
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    game: Game
  }

  type Auth {
    token: ID!
    user: User
  }

  type Game {
    score: Int
  }

  type Query {
    users: [User]
    user(username: String!): User
    game: Game
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateGame(score: Int!): Game
  }
`;

module.exports = typeDefs;
