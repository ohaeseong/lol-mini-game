import classNames from 'classnames';
import { includes } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../components/Footer';

type Props = {
  children: React.ReactNode;
  theme?: 'primary' | 'secondary';
};

const DefaultLayout: React.FC<Props> = ({ children, theme = 'primary' }) => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-between bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('${getBackgroundImage()}')`,
      }}
    >
      <h1
        className={classNames(
          'my-20 font-beaufort-bold text-2xl tracking-widest',
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

  function getBackgroundImage(): string {
    if (theme === 'secondary') {
      return '/images/backgrounds/background.png';
    }

    return '';
  }
};

export default DefaultLayout;
