import { gql, useMutation } from '@apollo/client';
import { ISmiteRank, IUpsertSmiteRank } from '../../common/types/SmiteRank';
import client from '../client/apollo-client';

export const UPSERT_SMITE_RANK = gql`
  mutation UpsertSmiteRank($upsertSmiteRankData: UpsertSmiteRankInput!) {
    upsertSmiteRank(upsertSmiteRankData: $upsertSmiteRankData) {
      summoner
      dragon
      rift_herald
      baron_nashoor
      elder_dragon
      average
    }
  }
`;

export interface IUpsertSmiteRankParams {
  upsertSmiteRankData: IUpsertSmiteRank;
}

export function useUpsertSmiteRank() {
  const [upsertSmiteRank, { data, ...rest }] = useMutation<
    { rank: ISmiteRank },
    IUpsertSmiteRankParams
  >(UPSERT_SMITE_RANK, {
    client,
  });

  return {
    upsertSmiteRank,
    rank: data?.rank,
    ...rest,
  };
}
