import Image from 'next/image';
import React from 'react';
import Button from '../components/Button';
import HealthBar from '../components/HealthBar';
import ObjectImage from '../components/ObjectImage';
import DefaultLayout from '../layouts/DefaultLayout';
import { SmiteKey } from '../types/game';
import { ObjectType } from '../types/object';
import { getRandomNumber } from '../utils/math';
import {
  getObjectAbility,
  getNextLevel,
  getObjectLevel,
} from '../utils/object';
import { getStorage } from '../utils/storage';

const SmiteContainer: React.FC = () => {
  const [object, setObject] = React.useState(ObjectType.DRAGON);

  const {
    HP: defaultHP,
    ATKRange,
    attackSpeedRange,
  } = getObjectAbility(object);

  const [ready, setReady] = React.useState(false);
  const [end, setEnd] = React.useState(false);

  const [HP, setHP] = React.useState(defaultHP);
  const [smiteKey, setSmiteKey] = React.useState<SmiteKey>(SmiteKey.D);

  React.useEffect(() => {
    if (!ready || end) return;

    const timeout = setTimeout(() => {
      setHP((prevHP) => {
        const nextHP = prevHP - getRandomNumber(ATKRange.min, ATKRange.max);

        if (nextHP <= 0) return 0;

        return nextHP;
      });
    }, getRandomNumber(attackSpeedRange.min, attackSpeedRange.max));

    return () => clearTimeout(timeout);
  }, [ready, HP, end, object]);

  React.useEffect(() => {
    if (!smiteKey || !ready || end) return;

    document.addEventListener('keydown', (e) => {
      console.log(end);

      if (e.code === smiteKey) {
        onSmite();
      }
    });
  }, [smiteKey, end, ready, onSmite]);

  React.useEffect(() => {
    setSmiteKey(getStorage('application:smite_key'));
  }, []);

  return (
    <DefaultLayout
      titleClassName="mb-4 mt-8"
      theme="secondary"
      background="/images/backgrounds/background.png"
      // overlay={!ready || end}
    >
      {!ready && (
        <Button className="absolute top-1/2 z-40" onClick={startGame}>
          Ready?
        </Button>
      )}
      ㄹ
      <div className="flex h-full w-full flex-col">
        <div className="mb-20 flex flex-col items-center text-center text-white">
          <hr className="w-20 border-t border-white" />
          <span className="mt-4 inline-block font-beaufort-bold text-base tracking-widest">
            {object.toUpperCase().replace(/_/g, ' ')}
          </span>
          <span className="mt-3 inline-block text-xs tracking-widest">
            LEVEL {getObjectLevel(object)}
          </span>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-between">
          <HealthBar progressValue={(HP / defaultHP) * 100} health={HP} />

          <ObjectImage object={object} width={280} height={280} />

          <div
            className="relative flex h-14 w-14 cursor-pointer items-center justify-center"
            onClick={onSmite}
          >
            <span className="absolute z-20 font-beaufort-bold text-3xl text-white">
              {smiteKey.replace(/Key/, '')}
            </span>
            <div className="absolute z-10 h-full w-full bg-red-100 opacity-30" />
            <Image
              className="absolute"
              src="/images/icon/smite.png"
              width={70}
              height={70}
              alt="smite"
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );

  function startGame() {
    setReady(true);
  }

  function resetObjectStat() {
    setHP(defaultHP);
  }

  function onSmite() {
    if (end) return;

    setEnd(true);

    setHP((prevHP) => {
      const nextHP = prevHP - 900;

      if (nextHP <= 0) return 0;

      return nextHP;
    });
  }
};

export default SmiteContainer;
