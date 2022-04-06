import Image from 'next/image';
import React, { useEffect } from 'react';
import Button from '../components/Button';
import { MonsterType } from '../components/MonsterCard';
import MonsterHealthBar from '../components/MonsterHealthBar';
import MonsterImage from '../components/MonsterImage';
import DefaultLayout from '../layouts/DefaultLayout';

type Props = {
  monster: MonsterType;
};

const MonsterSmiteContainer: React.FC<Props> = ({ monster }) => {
  const startHealth = getMonsterHealth(monster);
  const [monsterHealth, setMonsterHealth] = React.useState(startHealth);
  const [finalHealth, setFinalHealth] = React.useState(0);
  const [progressValue, setProgressValue] = React.useState(100);
  const [finalValue, setFinalValue] = React.useState(-1);
  const [gameState, setGameState] = React.useState(0);

  const handleSmite = React.useCallback(
    (damage: number) => {
      if (finalHealth || gameState === 0) return;

      if (monsterHealth - damage <= 0) {
        const overDamage = monsterHealth - damage;

        if (overDamage * -1 >= 100) {
          setFinalValue(0);
          return;
        }

        setFinalHealth(0);
        setFinalValue(0);
      } else {
        setFinalHealth(monsterHealth - damage);
        setFinalValue(
          Math.floor(((monsterHealth - damage) / startHealth) * 100)
        );
      }

      setGameState(-1);
    },
    [finalHealth, gameState, monsterHealth, startHealth]
  );

  const handleBaronHealth = React.useCallback(
    (damage: number) => {
      if (monsterHealth > 0 && finalHealth === 0) {
        const health = monsterHealth - damage;

        if (health <= 0) {
          setMonsterHealth(0);
          return;
        }

        setMonsterHealth(health);
        setProgressValue((health / startHealth) * 100);
      } else {
        setFinalHealth(monsterHealth - damage);
        setFinalValue(
          Math.floor(((monsterHealth - damage) / startHealth) * 100)
        );
      }
    },
    [monsterHealth, startHealth]
  );

  const startGame = () => {
    if (gameState === 0) {
      setGameState(1);
      setMonsterHealth(startHealth);
    }
  };

  const handleYoungSmite = () => {
    handleSmite(450);
  };

  const handleOldSmite = React.useCallback(() => {
    handleSmite(900);
  }, [handleSmite]);

  const playGame = React.useCallback(() => {
    const timeSpeedList = [100, 200, 400, 500, 600, 700, 800, 1000];
    const timeSpeed = timeSpeedList[Math.floor(Math.random() * 4)];

    const timer = setTimeout(async () => {
      let damage = Math.floor(Math.random() * 150);
      if (!damage) damage = 1;

      handleBaronHealth(damage);
    }, timeSpeed);

    if (monsterHealth <= 0 || finalValue !== -1) {
      clearTimeout(timer);
    }
  }, [monsterHealth, finalValue, handleBaronHealth]);

  useEffect(() => {
    if (gameState === 1) {
      playGame();
    }
  }, [gameState, monsterHealth, playGame]);

  useEffect(() => {
    if (gameState === 1) {
      const smiteKey = localStorage.getItem('smite_key');
      if (smiteKey) {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
          if (event.key === smiteKey.toLowerCase()) {
            handleOldSmite();
          }
        });
      }
    }
  }, [gameState, handleOldSmite]);

  return (
    <DefaultLayout theme="secondary">
      {gameState === 0 ? (
        <>
          <h1 className="z-10 font-beaufort-bold text-5xl text-white">
            Ready?
          </h1>
          <Button className="z-10" onClick={startGame}>
            GO!
          </Button>
          <div className="fixed h-screen w-screen bg-black opacity-50" />
        </>
      ) : (
        <>
          {!finalHealth ? (
            <MonsterHealthBar value={progressValue} health={monsterHealth} />
          ) : (
            <MonsterHealthBar value={finalValue} health={finalHealth} />
          )}
          {monster && <MonsterImage type={monster} width={250} height={250} />}
          <div className="relative flex h-12 w-12 cursor-pointer items-center justify-center">
            <span className="absolute z-20 font-beaufort-bold text-3xl text-white">
              {getSmiteKey()}
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
        </>
      )}
    </DefaultLayout>
  );

  function getMonsterHealth(monster: MonsterType) {
    switch (monster) {
      case MonsterType.DRAGON:
        return 3500;
      case MonsterType.RIFT_HERALD:
        return 7125;
      case MonsterType.BARON_NASHOOR:
        return 9000;
      case MonsterType.ELDER_DRAGON:
        return 12500;
      default:
        break;
    }
  }

  function getSmiteKey() {
    return localStorage.getItem('smite_key');
  }
};

export default MonsterSmiteContainer;
