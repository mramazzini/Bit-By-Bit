import { gql } from "@apollo/client";

export const GET_GAME = gql`
  query game {
    game {
      score
    }
  }
`;

export const GET_UPGRADES = gql`
  query upgrades {
    upgrades {
      name
      status
      flavor
      effect
    }
  }
`;
