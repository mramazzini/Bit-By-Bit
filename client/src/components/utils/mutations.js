import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_GAME = gql`
  mutation updateGame($score: Int!, $snowflakes: Int) {
    updateGame(score: $score, snowflakes: $snowflakes) {
      score
    }
  }
`;

export const PURCHASE_UPGRADE = gql`
  mutation purchaseUpgrade($name: String!, $score: Int!) {
    purchaseUpgrade(name: $name, score: $score)
  }
`;
export const PURCHASE_FARM_UPGRADE = gql`
  mutation purchaseFarmUpgrade($name: String!, $score: Int!) {
    purchaseFarmUpgrade(name: $name, score: $score)
  }
`;

export const CONVERT_CURRENCY = gql`
  mutation convertCurrency($name: String!, $currency_amount: Int!) {
    convertCurrency(name: $name, currency_amount: $currency_amount)
  }
`;
