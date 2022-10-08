import classNames from 'classnames';
import React from 'react';
import Footer from '../components/Footer';

type Props = {
  titleClassName?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  children: React.ReactNode;
  theme?: 'primary' | 'secondary';
  background?: string;
};

const DefaultLayout: React.FC<Props> = ({
  titleClassName,
  children,
  theme = 'primary',
  background,
}) => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-between bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('${background}')`,
      }}
    >
      <h1
        className={classNames(
          'font-beaufort-bold text-2xl tracking-widest',
          titleClassName,
          {
            'text-brown-400': theme === 'primary',
            'text-white': theme === 'secondary',
          }
        )}
      >
        SMITE OF LEGENDS
      </h1>
      {children}
      <Footer isShowVersion={theme === 'primary'} />
    </div>
  );
};

export default DefaultLayout;
