import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { MonsterType } from '../components/MonsterCard';
import MonsterSelector from '../components/MonsterSelector';
import DefaultLayout from '../layouts/DefaultLayout';
import Button from '../components/Button';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [monster, setMonster] = React.useState(MonsterType.DRAGON);
  const router = useRouter();

  useEffect(() => {}, []);

  useEffect(() => {
    if (loading === false) return;
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [loading]);

  return (
    <DefaultLayout>
      {!loading ? (
        <div className="flex flex-col items-center justify-center space-y-16">
          <MonsterSelector selectedMonster={monster} onChange={handleMonster} />
          <Button size="lg" onClick={linkToMonsterPage()}>
            START
          </Button>
        </div>
      ) : (
        <Image src="/images/logo.png" width={500} height={200} alt="logo" />
      )}
    </DefaultLayout>
  );

  function handleMonster(monster: MonsterType) {
    setMonster(monster);
  }

  function linkToMonsterPage(): () => void {
    const smiteKey = localStorage.getItem('smite_key');
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
