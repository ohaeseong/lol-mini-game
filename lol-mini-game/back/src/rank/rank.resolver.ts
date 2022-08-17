import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Rank } from './entities/rank.entity';
import { CreateRankInput, UpdateRankInput } from './rank.input';
import { RankService } from './rank.service';

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
