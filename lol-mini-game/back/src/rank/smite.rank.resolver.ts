import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Rank } from './entities/smite.rank.entity';
import { CreateRankInput, UpdateRankInput } from './smite.rank.input';
import { RankService } from './smite.rank_service';

@Resolver()
export class RankResolver {
  constructor(private rankService: RankService) {}

  @Query(() => [Rank])
  getRankList() {
    return this.rankService.getRankList();
  }

  @Mutation(() => Rank)
  createRank(@Args('createRankData') createRankData: CreateRankInput) {
    return this.rankService.createRank(createRankData);
  }

  // @Mutation(() => Rank)
  // updateRank(@Args('updateRankData') updateRankdata: UpdateRankInput) {
  //   return this.rankService.updateRank(updateRankdata);
  // }
}
