import { gql } from "@apollo/client";

export const GET_GAME = gql`
  query game {
    game {
      score
    }
  }
`;
