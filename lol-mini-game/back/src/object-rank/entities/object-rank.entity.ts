import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ObjectRank {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', length: 100, unique: true })
  summoner: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  damage: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  dragon: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  riftHerald: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  baronNashor: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  elderDragon: number;
}
