import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SmiteRank } from './entities/smite.rank.entity';
import { UpsertSmiteRankInput } from './smite.rank.input';
import { SmiteRankService } from './smite.rank.service';

@Resolver()
export class SmiteRankResolver {
  constructor(private smiteRankService: SmiteRankService) {}

  @Query(() => [SmiteRank])
  getSmiteRankList() {
    return this.smiteRankService.getSmiteRankList();
  }

  @Mutation(() => SmiteRank)
  upsertSmiteRank(
    @Args('upsertSmiteRankData') upsertSmiteRankData: UpsertSmiteRankInput,
  ) {
    return this.smiteRankService.upsertSmiteRank(upsertSmiteRankData);
  }
}
