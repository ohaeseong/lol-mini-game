import { Module } from '@nestjs/common';
import { SmiteRankService } from './smite.rank.service';
import { SmiteRankResolver } from './smite.rank.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmiteRank } from './entities/smite.rank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SmiteRank])],
  controllers: [],
  providers: [SmiteRankService, SmiteRankResolver],
})
export class RankModule {}
