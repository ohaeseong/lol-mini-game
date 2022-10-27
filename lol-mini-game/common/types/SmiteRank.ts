export interface ISmiteRank {
  id: number;
  average: number;
  dragon: number;
  rift_herald: number;
  baron_nashoor: number;
  elder_dragon: number;
  summoner: string;
  count: number;
  updated_at: Date;
  created_at: Date;
}

export interface IUpsertSmiteRank {
  average: number;
  dragon: number;
  rift_herald: number;
  baron_nashoor: number;
  elder_dragon: number;
  summoner: string;
}
