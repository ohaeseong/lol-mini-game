import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  children?: React.ReactNode;
  onClick?: (evt: React.MouseEvent) => void;
  size?: 'sm' | 'base' | 'lg';
};

const Button: React.FC<Props> = ({
  className,
  children,
  onClick,
  size = 'base',
}: Props) => {
  return (
    <button
      className={classNames('border-none bg-brown-300 text-white', className, {
        'py-3 px-28': size === 'lg',
        'py-3 px-14': size === 'base',
        'py-3 px-10': size === 'sm',
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
