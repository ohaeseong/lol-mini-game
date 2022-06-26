import React from 'react';
import classNames from 'classnames';
import MonsterImage from './MonsterImage';

export enum MonsterType {
  DRAGON = 'dragon',
  RIFT_HERALD = 'rift_herald',
  BARON_NASHOOR = 'baron_nashoor',
  ELDER_DRAGON = 'elder_dragon',
}

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  type: MonsterType;
  selected?: boolean;
  level?: number;
};

const MonsterCard: React.FC<Props> = ({
  className,
  type,
  selected = false,
  level,
}: Props) => {
  return (
    <>
      <div
        className={classNames(
          'relative flex h-[26rem] w-80 flex-col',
          className
        )}
      >
        <div
          className={classNames(
            'absolute z-10 h-full w-full bg-black-100 opacity-50',
            {
              block: !selected,
              hidden: selected,
            }
          )}
        />
        <div className="my-12 flex flex-col items-center">
          <span className="mt-4 inline-block font-extrabold tracking-wider">
            {type.toUpperCase().replace(/\_/g, ' ')}
          </span>
          <span className="text-xs tracking-wider text-brown-200">
            LEVEL {level}
          </span>
        </div>
        <div className="flex h-60 justify-center">
          <MonsterImage type={type} />
        </div>
      </div>
    </>
  );
};

export default MonsterCard;
