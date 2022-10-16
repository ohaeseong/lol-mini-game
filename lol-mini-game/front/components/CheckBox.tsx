import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  selected?: boolean;
  children?: React.ReactNode;
  onClick?: (evt: React.MouseEvent) => void;
};

const CheckBox: React.FC<Props> = ({
  className,
  selected = false,
  children,
  onClick,
}: Props) => {
  return (
    <button
      className={classNames(
        'h-20 w-20 px-0 py-0 font-beaufort-bold text-4xl text-white',
        className,
        {
          'bg-brown-200 text-white': selected,
          'border-2 border-brown-200 text-brown-200': !selected,
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CheckBox;
