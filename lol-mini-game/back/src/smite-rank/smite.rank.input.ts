import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpsertSmiteRankInput {
  @Field()
  average: number;

  @Field()
  dragon: number;

  @Field()
  rift_herald: number;

  @Field()
  baron_nashoor: number;

  @Field()
  elder_dragon: number;

  @Field()
  summoner: string;
}
