export interface IRank {
  id: number;
  summoner: string;
  score: number;
}

export interface ICreateRank {
  summoner: string;
  score: number;
}
