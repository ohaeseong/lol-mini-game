import React from 'react';
import classNames from 'classnames';
import ObjectImage from './ObjectImage';
import { ObjectType } from '../types/object';
import { getObjectLevel } from '../utils/object';

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  object: ObjectType;
};

const ObjectCard: React.FC<Props> = ({ className, object }: Props) => {
  return (
    <>
      <div
        className={classNames(
          'relative flex h-[26rem] w-80 flex-col',
          className
        )}
      >
        <div className="my-12 flex flex-col items-center">
          <span className="mt-4 inline-block font-extrabold tracking-wider">
            {object.toUpperCase().replace(/\_/g, ' ')}
          </span>
          <span className="text-xs tracking-wider text-brown-200">
            LEVEL {getObjectLevel(object)}
          </span>
        </div>
        <div className="flex h-60 justify-center">
          <ObjectImage object={object} resize={false} />
        </div>
      </div>
    </>
  );
};

export default ObjectCard;
