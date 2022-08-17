import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRankInput {
  @Field()
  score: number;

  @Field()
  summoner: string;
}
