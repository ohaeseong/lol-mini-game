import classNames from 'classnames';
import React from 'react';
import HealthBar from './HealthBar';

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  value: number;
  health: number;
};

const MonsterHealthBar: React.FC<Props> = ({ className, value, health }) => {
  return (
    <div
      className={classNames(
        'relative h-11 w-2/5 border border-gray-100 ',
        className
      )}
    >
      <span className="absolute top-2 left-1/2 z-10 text-white">{health}</span>
      <HealthBar value={value} state={2} />
      <HealthBar value={value} animation state={2} />
    </div>
  );
};

export default MonsterHealthBar;
