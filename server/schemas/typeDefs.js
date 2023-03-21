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
  type Currency {
    amount: Int
    name: String
    conversion_rate: Int
  }
  type Biome {
    name: String
    currency: Currency
    completion_percentage: Int
  }

  type Game {
    score: Int
    upgrades: [Upgrade]
    click_multiplier: Int
    biomes: [Biome]
  }

  type Upgrade {
    name: String!
    flavor: String!
    status: String!
    effect: String!
    description: String!
    price: Int!
    dependencies: [String]
    unlocks: [String]
  }

  type Query {
    users: [User]
    user(username: String!): User
    game: Game
    upgrades: [Upgrade]
    biomes: [Biome]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateGame(score: Int!): Game
    purchaseUpgrade(name: String!, score: Int!): String
  }
`;

module.exports = typeDefs;
