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
    upgrades: [Upgrade]
  }

  type Upgrade {
    name: String!
    flavor: String!
    status: String!
    effect: String!
    description: String!
    price: Int!
  }

  type Query {
    users: [User]
    user(username: String!): User
    game: Game
    upgrades: [Upgrade]
    clickMultiplier: Int
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateGame(score: Int!): Game
    purchaseUpgrade(name: String!, score: Int!, price: Int!): String
  }
`;

module.exports = typeDefs;
