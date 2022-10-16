import React from 'react';
import classNames from 'classnames';
import { DivElementClassName } from '../types/html';

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  theme?: 'primary' | 'clear';
  size?: 'sm' | 'base' | 'lg' | 'xl';
  children?: React.ReactNode;
  onClick?: (evt: React.MouseEvent) => void;
};

const Button: React.FC<Props> = ({
  className,
  theme = 'primary',
  size = 'base',
  children,
  onClick,
}: Props) => {
  return (
    <button
      className={classNames('text-white', className, getClassName({ theme }), {
        'py-3 px-28': size === 'xl',
        'py-3 px-16': size === 'lg',
        'py-3 px-14': size === 'base',
        'py-3 px-10': size === 'sm',
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

function getClassName({
  theme,
}: Pick<Props, 'theme'>): Record<DivElementClassName, boolean> {
  switch (theme) {
    case 'primary':
      return {
        'border-none bg-brown-200': true,
        // 'some classnames': true && !disable,
      };
    case 'clear':
      return {
        'border-none bg-gray-200 bg-opacity-40': true,
      };
    default:
      return {
        'border-none bg-brown-200': true,
      };
  }
}

export default Button;
