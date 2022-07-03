import { Resolver, Query } from '@nestjs/graphql';
import { Rank } from './entities/rank.entity';
import { RankService } from './rank.service';

@Resolver()
export class RankResolver {
  constructor(private rankService: RankService) {}

  @Query(() => [Rank])
  getRankList() {
    return this.rankService.getRankList();
  }
}
