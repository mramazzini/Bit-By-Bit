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
      description
      price
    }
  }
`;
export const GET_CLICK_MULTIPLIER = gql`
  query clickMultiplier {
    clickMultiplier
  }
`;
