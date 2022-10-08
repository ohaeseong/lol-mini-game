import { ObjectType } from '../types/object';

export type MinMax = {
  min: number;
  max: number;
};

type ObjectAbility = {
  HP: number;
  ATKRange: MinMax;
  attackSpeedRange: MinMax;
};

export function getNextLevel(object: ObjectType): number {
  const nextLevel = getObjectLevel(object) + 1;

  return nextLevel > 4 ? -1 : nextLevel;
}

export function getObjectAbility(object: ObjectType): ObjectAbility {
  switch (object) {
    case ObjectType.DRAGON:
      return {
        HP: 3500,
        ATKRange: {
          min: 0,
          max: 300,
        },
        attackSpeedRange: {
          min: 100,
          max: 500,
        },
      };
    case ObjectType.RIFT_HERALD:
      return {
        HP: 7150,
        ATKRange: {
          min: 100,
          max: 400,
        },
        attackSpeedRange: {
          min: 100,
          max: 500,
        },
      };
    case ObjectType.BARON_NASHOOR:
      return {
        HP: 9000,
        ATKRange: {
          min: 100,
          max: 300,
        },
        attackSpeedRange: {
          min: 100,
          max: 300,
        },
      };
    case ObjectType.ELDER_DRAGON:
      return {
        HP: 13000,
        ATKRange: {
          min: 200,
          max: 450,
        },
        attackSpeedRange: {
          min: 100,
          max: 400,
        },
      };
    default:
      break;
  }
}

export function getObjectLevel(object: ObjectType): number {
  const LEVELS: {
    [key in keyof typeof ObjectType]: number;
  } = {
    DRAGON: 1,
    RIFT_HERALD: 2,
    BARON_NASHOOR: 3,
    ELDER_DRAGON: 4,
  };

  return LEVELS[object.toUpperCase()];
}

export function getObjectImageUrl(object: ObjectType): string {
  const IMAGE_URLS: {
    [key in keyof typeof ObjectType]: string;
  } = {
    DRAGON: '/images/objects/dragon.png',
    RIFT_HERALD: '/images/objects/rift_herald.png',
    BARON_NASHOOR: '/images/objects/baron_nashoor.png',
    ELDER_DRAGON: '/images/objects/elder_dragon.png',
  };

  return IMAGE_URLS[object.toUpperCase()];
}
