import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ObjectRank } from './entities/object-rank.entity';
import { CreateObjectRankInput } from './object-rank.input';
import { RankService } from './object-rank.service';

@Resolver()
export class RankResolver {
  constructor(private rankService: RankService) {}

  @Query(() => [ObjectRank])
  getRankList() {
    return this.rankService.getRankList();
  }

  @Mutation(() => ObjectRank)
  createRank(
    @Args('createObjectRankData') createObjectRankInput: CreateObjectRankInput,
  ) {
    return this.rankService.createRank(createObjectRankInput);
  }

  // @Mutation(() => Rank)
  // updateRank(@Args('updateRankData') updateRankdata: UpdateRankInput) {
  //   return this.rankService.updateRank(updateRankdata);
  // }
}
