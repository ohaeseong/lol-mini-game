import { useQuery } from '@apollo/client';
import { IRank } from '../../common/types/Rank';
import client from '../apollo-client';
import { GET_RANK_LIST } from './rank.queries';

export function useRanks() {
  const { data, ...rest } = useQuery<{ getRankList: IRank[] }>(GET_RANK_LIST, {
    client,
  });

  return {
    ranks: data?.getRankList || [],
    ...rest,
  };
}
