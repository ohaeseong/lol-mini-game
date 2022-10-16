import { useQuery } from '@apollo/client';
import { ISmiteRank } from '../../common/types/SmiteRank';
import client from '../client/apollo-client';
import { GET_SMITE_RANK_LIST } from './smite.rank.queries';

export function useRanks() {
  const { data, ...rest } = useQuery<{ getSmiteRankList: ISmiteRank[] }>(
    GET_SMITE_RANK_LIST,
    {
      client,
      fetchPolicy: 'no-cache',
    }
  );

  return {
    ranks: data?.getSmiteRankList || [],
    ...rest,
  };
}
