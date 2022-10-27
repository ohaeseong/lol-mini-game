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
        updated_at: 'ASC',
      },
      take: 10,
    });

    return ranks;
  }

  async upsertSmiteRank(rank: UpsertSmiteRankInput): Promise<SmiteRank> {
    const prevRank = await this.rankRepo.findOne({
      where: {
        summoner: rank.summoner,
      },
    });

    if (prevRank?.average >= rank.average) {
      return prevRank;
    } else {
      const _rank = {
        ...rank,
        count: (prevRank?.count ? prevRank?.count : 0) + 1,
        updated_at: new Date(),
      };

      const newRank = await this.rankRepo.upsert(_rank, ['id', 'summoner']);

      return await this.rankRepo.findOne({
        where: {
          id: newRank.identifiers[0].id,
        },
      });
    }
  }
}
