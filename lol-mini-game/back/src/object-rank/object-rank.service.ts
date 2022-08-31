import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectRank } from './entities/object-rank.entity';
import { CreateObjectRankInput, UpdateRankInput } from './object-rank.input';

@Injectable()
export class RankService {
  constructor(
    @InjectRepository(ObjectRank)
    private readonly rankRepo: Repository<ObjectRank>,
  ) {}

  async getRankList(): Promise<Array<ObjectRank>> {
    const ranks = await this.rankRepo.find({
      order: {
        damage: 'ASC',
      },
    });

    return ranks;
  }

  createRank(rank: CreateObjectRankInput): Promise<ObjectRank> {
    console.log(rank);

    return this.rankRepo.save(rank);
  }

  // updateRank(rank: UpdateRankInput): Promise<Rank> {
  //   return this.rankRepo.update({});
  // }
}
