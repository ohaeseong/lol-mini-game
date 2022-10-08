import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import DefaultLayout from '../../layouts/DefaultLayout';
import { ObjectType } from '../../types/object';
import { getObjectLevel } from '../../utils/object';
import { setStorage } from '../../utils/storage';

const SettingPage: NextPage = () => {
  const [smiteKey, setSmiteKey] = useState('D');
  const router = useRouter();

  useEffect(() => {
    setStorage('smite_key', smiteKey);
  }, [smiteKey, router]);

  return (
    <DefaultLayout
      titleClassName="mb-4 mt-8"
      theme="secondary"
      background="/images/backgrounds/background.png"
    >
      <div className="flex h-full w-full flex-col items-center justify-between">
        <div className="flex flex-col items-center text-white">
          <hr className="w-20 border-t border-white" />
          <span className="mt-4 inline-block pl-2 text-center font-beaufort-bold tracking-widest">
            {ObjectType.DRAGON.toUpperCase()}
          </span>
          <span className="mt-3 inline-block text-xs tracking-widest">
            LEVEL {getObjectLevel(ObjectType.DRAGON)}
          </span>
        </div>
        <div className="mb-16">
          <div className="flex justify-center space-x-6">
            <Image
              src="/images/icon/smite.png"
              width={80}
              height={80}
              alt="smite"
            />
            <div className="flex space-x-3">
              <Button
                type="check"
                selected={smiteKey === 'D'}
                onClick={handleSpellKey('D')}
              >
                D
              </Button>
              <Button
                type="check"
                selected={smiteKey === 'F'}
                onClick={handleSpellKey('F')}
              >
                F
              </Button>
            </div>
          </div>
          <p className="mt-4 mb-14 text-center font-beaufort-bold text-lg tracking-widest text-white">
            SMITE KEY <br /> CHOICE
          </p>
          <Button
            className="w-full font-beaufort-bold"
            onClick={goToSmitePage()}
          >
            START
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );

  function handleSpellKey(key: 'D' | 'F'): () => void {
    return () => {
      setSmiteKey(key);
    };
  }

  function goToSmitePage(): () => void {
    return () => {
      router.push(`/smite`);
    };
  }
};

export default SettingPage;
