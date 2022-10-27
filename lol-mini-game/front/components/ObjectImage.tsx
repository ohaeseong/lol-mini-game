import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import { ObjectType } from '../types/object';
import { getObjectImageUrl } from '../utils/object';

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  object: ObjectType;
  width?: number;
  height?: number;
};

const ObjectImage: React.FC<Props> = ({
  className,
  object,
  width = 160,
  height = 160,
}) => {
  if (object === ObjectType.RIFT_HERALD) {
    width = width - 100;
    height = height - 100;
  }

  return (
    <Image
      className={classNames('object-contain', className)}
      src={getObjectImageUrl(object)}
      width={width}
      height={height}
      alt={object}
    />
  );
};

export default ObjectImage;
