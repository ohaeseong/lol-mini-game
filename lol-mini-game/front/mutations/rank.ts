import { gql, useMutation } from '@apollo/client';
import { ICreateRank, IRank } from '../../common/types/Rank';
import client from '../apollo-client';

export const CREATE_RANK = gql`
  mutation CreateRank($createRankData: CreateRankInput!) {
    createRank(createRankData: $createRankData) {
      summoner
      dragon
      riftHerald
      baronNashor
      elderDragon
    }
  }
`;

export interface CreateRankParams {
  createRankData: ICreateRank;
}

export function useAddObjectRank() {
  const [addRank, { data, ...rest }] = useMutation<
    { rank: IRank },
    CreateRankParams
  >(CREATE_RANK, {
    client,
  });

  return {
    addRank,
    reaction: data?.rank,
    ...rest,
  };
}
