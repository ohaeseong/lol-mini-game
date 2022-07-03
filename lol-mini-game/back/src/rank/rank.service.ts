import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rank } from './entities/rank.entity';

@Injectable()
export class RankService {
  constructor(
    @InjectRepository(Rank) private readonly rankRepo: Repository<Rank>,
  ) {}

  getRankList(): Promise<Array<Rank>> {
    return this.rankRepo.find();
  }
}
