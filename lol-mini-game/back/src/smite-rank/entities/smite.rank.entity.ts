import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class SmiteRank {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', length: 100, unique: true })
  summoner: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  average: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  dragon: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  rift_herald: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  baron_nashoor: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  elder_dragon: number;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  count: number;

  @Field(() => Date)
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Field(() => Date)
  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
