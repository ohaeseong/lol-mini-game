import { Module } from '@nestjs/common';
import { RankService } from './smite.rank_service';
import { RankResolver } from './smite.rank.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rank } from './entities/smite.rank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rank])],
  controllers: [],
  providers: [RankService, RankResolver],
})
export class RankModule {}
