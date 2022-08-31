import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateObjectRankInput {
  @Field()
  dragon: number;

  @Field()
  riftHerald: number;

  @Field()
  baronNashor: number;

  @Field()
  elderDragon: number;

  @Field()
  summoner: string;
}

@InputType()
export class UpdateRankInput {
  @Field()
  id: number;

  @Field()
  dragon: number;

  @Field()
  riftHerald: number;

  @Field()
  baronNashor: number;

  @Field()
  elderDragon: number;
}
