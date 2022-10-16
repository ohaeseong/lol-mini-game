export interface ISmiteRank {
  id: number;
  average: number;
  dragon: number;
  rift_herald: number;
  baron_nashoor: number;
  elder_dragon: number;
  summoner: string;
}

export interface IUpsertSmiteRank {
  average: number;
  dragon: number;
  rift_herald: number;
  baron_nashoor: number;
  elder_dragon: number;
  summoner: string;
}
