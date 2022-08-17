import { gql } from '@apollo/client';

export const GET_RANK_LIST = gql`
  query GetRankList {
    getRankList {
      id
      summoner
      score
    }
  }
`;
