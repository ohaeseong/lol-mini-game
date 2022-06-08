import classNames from 'classnames';
import React from 'react';

type Props = {
  value: number;
  animation?: boolean;
  theme?: 'primary' | 'secondary' | 'tertiary';
};

const HealthBar: React.FC<Props> = ({
  value,
  animation,
  theme = 'primary',
}) => {
  return (
    <div
      className={classNames('absolute h-full', {
        'transition-all duration-500': animation,
        'bg-yellow-100': theme === 'primary',
        'bg-orange-100': theme === 'secondary',
        'bg-red-100': theme === 'tertiary',
      })}
      style={{
        width: `${value}%`,
      }}
    />
  );
};

export default HealthBar;
