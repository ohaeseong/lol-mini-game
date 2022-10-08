import classNames from 'classnames';
import React from 'react';

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  theme?: 'primary' | 'secondary' | 'tertiary';
  value: number;
  animation?: boolean;
};

const ProgressBar: React.FC<Props> = ({
  className,
  theme = 'primary',
  value,
  animation,
}) => {
  return (
    <div
      className={classNames('absolute h-full', className, {
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

export default ProgressBar;
