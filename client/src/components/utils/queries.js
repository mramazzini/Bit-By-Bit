import { gql } from "@apollo/client";

export const GET_GAME = gql`
  query game {
    game {
      score
      click_multiplier
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
      dependencies
    }
  }
`;
export const GET_CLICK_MULTIPLIER = gql`
  query clickMultiplier {
    clickMultiplier
  }
`;
export const GET_BIOMES = gql`
  query biomes {
    biomes {
      completion_percentage
      name
    }
  }
`;
