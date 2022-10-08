import classNames from 'classnames';
import React from 'react';
import { ObjectType } from '../types/object';
import ObjectCard from './ObjectCard';

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
};

const ObjectList: React.FC<Props> = ({ className }: Props) => {
  return (
    <div className={classNames('flex border border-brown-100', className)}>
      {Object.values(ObjectType).map((object: ObjectType, index: number) => (
        <ObjectCard key={`${object}-${index}`} object={object} />
      ))}
    </div>
  );
};

export default ObjectList;
