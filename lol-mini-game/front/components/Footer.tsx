import classNames from 'classnames';
import React from 'react';
import pakagesJson from '../package.json';

type Props = {
  hideVersion?: boolean;
};

const Footer: React.FC<Props> = ({ hideVersion = false }) => {
  return (
    <footer className="mt-20 flex w-full flex-col items-center justify-center text-brown-400">
      {!hideVersion && (
        <div className={classNames('text-center')}>
          <span className="font-beaufort-bold">FAN GAME</span>
          <br />
          <span className="mt-2 inline-block text-sm tracking-wider">
            VERSION-{pakagesJson.version}-2022
          </span>
        </div>
      )}
      <p
        className={classNames(
          'break-words text-center text-sm font-thin tracking-wider',
          {
            'px-20 pb-10': hideVersion,
            'p-20': !hideVersion,
          }
        )}
      >
        © 2012-2022 proj-ward. proj-ward isn’t endorsed by Riot Games and
        doesn’t reflect the views or opinions of Riot Games or anyone officially
        involved in producing or managing League of Legends. League of Legends
        and Riot Games are trademarks or registered trademarks of Riot Games,
        Inc. League of Legends © Riot Games, Inc.
      </p>
    </footer>
  );
};

export default Footer;
