import { Module } from '@nestjs/common';
import { RankService } from './object-rank.service';
import { RankResolver } from './object-rank';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectRank } from './entities/object-rank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ObjectRank])],
  controllers: [],
  providers: [RankService, RankResolver],
})
export class RankModule {}
