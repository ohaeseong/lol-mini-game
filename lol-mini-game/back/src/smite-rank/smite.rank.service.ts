import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmiteRank } from './entities/smite.rank.entity';
import { UpsertSmiteRankInput } from './smite.rank.input';

@Injectable()
export class SmiteRankService {
  constructor(
    @InjectRepository(SmiteRank)
    private readonly rankRepo: Repository<SmiteRank>,
  ) {}

  async getSmiteRankList(): Promise<Array<SmiteRank>> {
    const ranks = await this.rankRepo.find({
      order: {
        average: 'DESC',
      },
    });

    return ranks;
  }

  async upsertSmiteRank(rank: UpsertSmiteRankInput): Promise<SmiteRank> {
    const newRank = await this.rankRepo.upsert(rank, ['id', 'summoner']);

    return this.rankRepo.findOne({
      where: {
        id: newRank.identifiers[0].id,
      },
    });
  }
}
