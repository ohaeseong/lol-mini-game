import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rank } from './entities/smite.rank.entity';
import { CreateRankInput, UpdateRankInput } from './smite.rank.input';

@Injectable()
export class RankService {
  constructor(
    @InjectRepository(Rank) private readonly rankRepo: Repository<Rank>,
  ) {}

  async getRankList(): Promise<Array<Rank>> {
    const ranks = await this.rankRepo.find({
      order: {
        score: 'DESC',
      },
    });

    return ranks;
  }

  createRank(rank: CreateRankInput): Promise<Rank> {
    return this.rankRepo.save(rank);
  }

  // updateRank(rank: UpdateRankInput): Promise<Rank> {
  //   return this.rankRepo.update({});
  // }
}
