import { Module } from '@nestjs/common';
import { RankService } from './rank.service';
import { RankResolver } from './rank.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rank } from './entities/rank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rank])],
  controllers: [],
  providers: [RankService, RankResolver],
})
export class RankModule {}
