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
    amount_per_second: Int
  }
  type Biome {
    name: String
    currency: Currency
    completion_percentage: Int
    farms: [Farm]
  }
  type Farm {
    name: String
    flavor: String
    status: String
    description: String
    cost: Int
    level: Int
    amount_per_second: Int
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
    amount_per_second(biome_name: String!): Int
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateGame(score: Int!, snowflakes: Int): Game
    purchaseUpgrade(name: String!, score: Int!): String
    purchaseFarmUpgrade(name: String!, score: Int!): String
    convertCurrency(name: String!, currency_amount: Int!): String
  }
`;

module.exports = typeDefs;
