export enum GameState {
  Ready = 'ready',
  End = 'End',
  Start = 'Start',
}

export enum SmiteKey {
  D = 'KeyD',
  F = 'KeyF',
}

export interface ICoordinate {
  x: number;
  y: number;
  z: number;
}
