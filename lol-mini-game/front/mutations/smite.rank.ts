import { gql, useMutation } from '@apollo/client';
import { ISmiteRank, ICreateSmiteRank } from '../../common/types/Rank';
import client from '../client/apollo-client';

export const CREATE_SMITE_RANK = gql`
  mutation CreateSmiteRank($createSmiteRankData: CreateSmiteRankInput!) {
    createSmiteRank(createSmiteRankData: $createSmiteRankData) {
      id
      average
      dragon
      rift_herald
      baron_nashoor
      elder_dragon
      summoner
    }
  }
`;

export interface CreateSmiteRankParams {
  createSmiteRankData: ICreateSmiteRank;
}

export function useAddRank() {
  const [addRank, { data, ...rest }] = useMutation<
    { rank: ISmiteRank },
    CreateSmiteRankParams
  >(CREATE_SMITE_RANK, {
    client,
  });

  return {
    addRank,
    ranks: data?.rank,
    ...rest,
  };
}
