/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import GameResultBox from '../components/GameResultBox';
import { MonsterType } from '../components/MonsterCard';
import MonsterHealthBar from '../components/MonsterHealthBar';
import MonsterImage from '../components/MonsterImage';
import DefaultLayout from '../layouts/DefaultLayout';
import { getStorage } from '../utils/storage';

type TimerRange = {
  min: number;
  max: number;
};

type MonsterAbility = {
  health: number;
  attackRange: TimerRange;
  attackSpeedRange: TimerRange;
};

type Props = {
  monster: MonsterType;
};

const MonsterSmiteContainer: React.FC<Props> = ({ monster }) => {
  const [isReady, setIsReady] = useState(true);

  const [entireMonsterHealth, setEntireMonsterHealth] = useState(0);
  const [monsterHealth, setMonsterHealth] = useState(0);
  const [progressValue, setProgressValue] = useState(100);
  const [smiteKey, setSmiteKey] = useState('');

  const [finalMonsterHealth, setFinalMonsterHealth] = useState(-1);
  const [finalProgressValue, setFinalProgressValue] = useState(-1);

  const [isUseSmite, setIsUseSmite] = useState(false);

  useEffect(() => {
    setSmiteKey(getStorage('smite_key'));

    if (isReady) return;
    const { attackRange, attackSpeedRange } = getMonsterAbilityByLevel();
    let newHealth = monsterHealth - getRandomEssence(attackRange);

    if (newHealth < 0) newHealth = 0;

    if (newHealth >= 0 && !isUseSmite) {
      setTimeout(() => {
        handleMonsterStats(newHealth);
      }, getRandomEssence(attackSpeedRange));
    }
  }, [isReady, monsterHealth]);

  useEffect(() => {
    if (!monster) return;

    const { health } = getMonsterAbilityByLevel();

    setMonsterHealth(health);
    setEntireMonsterHealth(health);
  }, [monster]);

  useEffect(() => {
    if (isReady || !smiteKey || isUseSmite) return;

    document.addEventListener('keydown', (e) => {
      if (e.key === smiteKey.toLowerCase()) {
        embezzleSmite();
      }
    });
  }, [isReady, monsterHealth, smiteKey]);

  return (
    <>
      {isReady && (
        <>
          <Button
            className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 bg-opacity-100 text-3xl font-bold"
            onClick={startGame}
          >
            Ready?
          </Button>
          <div className="absolute z-20 flex h-screen w-screen items-center justify-center bg-black opacity-60" />
        </>
      )}

      <GameResultBox
        isSuccess={finalMonsterHealth < 0 && finalMonsterHealth > -900}
        point={Math.abs(finalMonsterHealth)}
        visible={isUseSmite}
        currentLevel={monster}
      />

      <DefaultLayout theme="secondary">
        {finalMonsterHealth === -1 ? (
          <MonsterHealthBar
            progressValue={progressValue}
            health={monsterHealth}
          />
        ) : (
          <MonsterHealthBar
            progressValue={finalProgressValue}
            health={finalMonsterHealth}
          />
        )}
        {monster && <MonsterImage type={monster} width={250} height={250} />}
        <div
          className="relative flex h-12 w-12 cursor-pointer items-center justify-center"
          onClick={embezzleSmite}
        >
          <span className="absolute z-10 font-beaufort-bold text-3xl text-white">
            {smiteKey}
          </span>
          <div className="absolute z-10 h-full w-full bg-red-100 opacity-30" />
          <Image
            className="absolute"
            src="/images/icon/smite.png"
            width={60}
            height={60}
            alt="smite"
          />
        </div>
      </DefaultLayout>
    </>
  );

  function embezzleSmite(): void {
    const newHealth = monsterHealth - 900;

    setIsUseSmite(true);
    setFinalMonsterHealth(newHealth);

    if (newHealth <= 0) {
      setFinalProgressValue(0);
    } else {
      setFinalProgressValue((newHealth / entireMonsterHealth) * 100);
    }
  }

  function handleMonsterStats(newHealth: number): void {
    setMonsterHealth(newHealth);
    setProgressValue((newHealth / entireMonsterHealth) * 100);
  }

  function getRandomEssence(range: TimerRange): number {
    return Math.floor(Math.random() * (range.max - range.min)) + range.min;
  }

  function getMonsterAbilityByLevel(): MonsterAbility {
    switch (monster) {
      case MonsterType.DRAGON:
        return {
          health: 3500,
          attackRange: {
            min: 0,
            max: 300,
          },
          attackSpeedRange: {
            min: 100,
            max: 500,
          },
        };
      case MonsterType.RIFT_HERALD:
        return {
          health: 7150,
          attackRange: {
            min: 100,
            max: 400,
          },
          attackSpeedRange: {
            min: 100,
            max: 500,
          },
        };
      case MonsterType.BARON_NASHOOR:
        return {
          health: 9000,
          attackRange: {
            min: 100,
            max: 300,
          },
          attackSpeedRange: {
            min: 100,
            max: 300,
          },
        };
      case MonsterType.ELDER_DRAGON:
        return {
          health: 13000,
          attackRange: {
            min: 200,
            max: 450,
          },
          attackSpeedRange: {
            min: 100,
            max: 400,
          },
        };
      default:
        break;
    }
  }

  function startGame() {
    setIsReady(false);
  }
};

export default MonsterSmiteContainer;
