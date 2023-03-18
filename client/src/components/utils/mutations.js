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
  mutation updateGame($score: Int!) {
    updateGame(score: $score) {
      score
    }
  }
`;

export const PURCHASE_UPGRADE = gql`
  mutation purchaseUpgrade($name: String!, $score: Int!, $price: Int!) {
    purchaseUpgrade(name: $name, score: $score, price: $price)
  }
`;
