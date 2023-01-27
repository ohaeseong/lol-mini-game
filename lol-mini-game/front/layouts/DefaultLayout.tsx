import classNames from 'classnames';
import React, { LegacyRef, PropsWithChildren } from 'react';
import Footer from '../components/Footer';

type Props<T> = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  titleClassName?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  children: React.ReactNode;
  theme?: 'primary' | 'secondary';
  hideFooterVersion?: boolean;
  ref?: LegacyRef<T>;
  background?: string;
};

function DefaultLayout<T>({
  className,
  titleClassName,
  children,
  theme = 'primary',
  hideFooterVersion = false,
  background,
}: Props<T>) {
  return (
    <div
      className={classNames(
        'flex h-screen w-screen flex-col items-center justify-between bg-cover bg-center bg-no-repeat object-contain',
        {
          'bg-black-200': background,
        },
        className
      )}
      style={{
        backgroundImage: `url('${background}')`,
      }}
    >
      <h1
        className={classNames(
          'z-40 font-beaufort-bold text-2xl tracking-widest',
          titleClassName,
          {
            'text-brown-400': theme === 'primary',
            'text-white': theme === 'secondary',
          }
        )}
      >
        SMITE OF LEGENDS
      </h1>
      <hr className="z-40 w-32 border-t border-white" />
      {children}
      <Footer hideVersion={hideFooterVersion} />
    </div>
  );
}

export default DefaultLayout;
