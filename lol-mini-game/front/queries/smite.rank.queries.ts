import { gql } from '@apollo/client';

export const GET_SMITE_RANK_LIST = gql`
  query GetSmiteRankList {
    getSmiteRankList {
      id
      summoner
      average
      dragon
      rift_herald
      baron_nashoor
      elder_dragon
    }
  }
`;
