import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  children?: React.ReactNode;
  onClick?: (evt: React.MouseEvent) => void;
  size?: 'sm' | 'base' | 'lg';
  type?: 'default' | 'check';
  selected?: boolean;
};

const Button: React.FC<Props> = ({
  className,
  children,
  onClick,
  size = 'base',
  type = 'default',
  selected = false,
}: Props) => {
  return (
    <button
      className={classNames('text-white', className, {
        'py-3 px-28': size === 'lg',
        'py-3 px-14': size === 'base',
        'py-3 px-10': size === 'sm',
        'border-none bg-brown-200': type === 'default',
        'h-20 w-20 px-0 py-0 font-beaufort-bold text-4xl': type === 'check',
        'bg-brown-200 text-white': type === 'check' && selected,
        'border-2 border-brown-200 text-brown-200':
          type === 'check' && !selected,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
