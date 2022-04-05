import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import MonsterHealthBar from '../components/MonsterHealthBar';
import DefaultLayout from '../layouts/DefaultLayout';

const MonsterSmiteContainer: NextPage = () => {
  const startHealth = 3500;
  const timeSpeedList = [100, 200, 400, 500, 600, 700, 800, 1000];

  const [monsterHealth, setMonsterHealth] = React.useState(startHealth);
  const [finalHealth, setFinalHealth] = React.useState(0);
  const [progressValue, setProgressValue] = React.useState(100);
  const [finalValue, setFinalValue] = React.useState(-1);
  const [gameState, setGameState] = React.useState(0);

  const handleSmite = (damage: number) => {
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
      setFinalValue(Math.floor(((monsterHealth - damage) / startHealth) * 100));

      const health = monsterHealth - damage - 900;
    }

    setGameState(0);
  };

  const handleYoungSmite = () => {
    handleSmite(450);
  };

  const handleOldSmite = () => {
    handleSmite(900);
  };

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
      }
    },
    [finalHealth, monsterHealth]
  );

  const startGame = () => {
    if (gameState === 0) {
      setGameState(1);
    }
  };

  const playGame = React.useCallback(() => {
    const timeSpeed = timeSpeedList[Math.floor(Math.random() * 4)];

    const timer = setTimeout(async () => {
      let damage = Math.floor(Math.random() * 150);
      if (!damage) damage = 1;

      handleBaronHealth(damage);
    }, timeSpeed);

    if (monsterHealth <= 0 || finalValue !== -1) {
      clearTimeout(timer);
    }
  }, [timeSpeedList, monsterHealth, finalValue, handleBaronHealth]);

  useEffect(() => {
    playGame();
  }, [gameState, monsterHealth]);

  return (
    <DefaultLayout theme="secondary">
      <MonsterHealthBar value={progressValue} health={monsterHealth} />
      <Image src=""  />
    </DefaultLayout>
  );
};

export default MonsterSmiteContainer;
