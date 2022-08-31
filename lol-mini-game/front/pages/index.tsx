import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { MonsterType } from '../components/MonsterCard';
import MonsterSelector from '../components/MonsterSelector';
import DefaultLayout from '../layouts/DefaultLayout';
import Button from '../components/Button';
import { useRouter } from 'next/router';
import { getStorage } from '../utils/storage';

const Home: NextPage = () => {
  const [loading, setLoading] = React.useState(true);
  const [monster, setMonster] = React.useState(MonsterType.DRAGON);
  const router = useRouter();

  useEffect(() => {
    if (loading === false) return;
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [loading]);

  return (
    <DefaultLayout>
      {loading ? (
        <>
          <Image src="/images/logo.png" width={500} height={200} alt="logo" />
          <div className="relative flex w-1/4 overflow-hidden rounded">
            <div className="flex-1 -rotate-180 ">
              <div className="animate-[progress_5s_ease-in-out] border border-brown-300" />
            </div>
            <div className="flex-1">
              <div className="animate-[progress_5s_ease-in-out] border border-brown-300" />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-16">
          <MonsterSelector
            selectedMonster={monster}
            onChange={handleMonster}
            disableSelect
          />
          <Button size="lg" onClick={linkToMonsterPage()}>
            START
          </Button>
        </div>
      )}
    </DefaultLayout>
  );

  function handleMonster(monster: MonsterType) {
    setMonster(monster);
  }

  function linkToMonsterPage(): () => void {
    const smiteKey = getStorage('smite_key');

    if (!smiteKey) {
      return () => {
        router.push(`/setting?${monster}`);
      };
    }

    return () => {
      router.push(`/monster?${monster}`);
    };
  }
};

export default Home;
