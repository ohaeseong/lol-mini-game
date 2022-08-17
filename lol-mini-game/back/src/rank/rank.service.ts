import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rank } from './entities/rank.entity';
import { CreateRankInput } from './rank.input';

@Injectable()
export class RankService {
  constructor(
    @InjectRepository(Rank) private readonly rankRepo: Repository<Rank>,
  ) {}

  async getRankList(): Promise<Array<Rank>> {
    const ranks = await this.rankRepo.find({
      order: {
        score: 'ASC',
      },
    });

    const sortedRanks = ranks.map((rank, index) => {
      return Math.abs(rank.score - 0) < Math.abs(ranks[index + 1]?.score - 0)
        ? rank
        : ranks[index + 1];
    });
    console.log(sortedRanks);

    return sortedRanks;
  }

  createRank(rank: CreateRankInput): Promise<Rank> {
    return this.rankRepo.save(rank);
  }
}
