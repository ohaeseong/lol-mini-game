import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import { MonsterType } from './MonsterCard';

const MONSTER_IMAGES: {
  [key in keyof typeof MonsterType]: string;
} = {
  DRAGON: '/images/monsters/dragon.png',
  RIFT_HERALD: '/images/monsters/rift_herald.png',
  BARON_NASHOOR: '/images/monsters/baron_nashoor.png',
  ELDER_DRAGON: '/images/monsters/elder_dragon.png',
};

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  type: MonsterType;
};

const MonsterImage: React.FC<Props> = ({ className, type }) => {
  return (
    <Image
      className={classNames('object-contain', className)}
      src={MONSTER_IMAGES[type.toUpperCase()]}
      width={160}
      height={160}
      alt={type}
    />
  );
};

export default MonsterImage;
