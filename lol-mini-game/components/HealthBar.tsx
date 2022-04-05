import classNames from 'classnames';
import React from 'react';

type Props = {
  value: number;
  animation?: boolean;
  state: number;
};

const HealthBar: React.FC<Props> = ({ value, animation, state }) => {
  return (
    <div
      className={classNames('absolute h-full', {
        'transition-all': animation,
        'bg-yellow-100': state === 2,
        'bg-orange-100': state === 1,
        'bg-red-100': state === 0,
      })}
      style={{
        width: `${value}%`,
      }}
    />
  );
};

export default HealthBar;
