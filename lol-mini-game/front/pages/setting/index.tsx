import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import DefaultLayout from '../../layouts/DefaultLayout';
import { setStorage } from '../../utils/storage';

const SettingPage: NextPage = () => {
  const [smiteKey, setSmiteKey] = useState('D');
  const router = useRouter();

  useEffect(() => {
    setStorage('smite_key', smiteKey);
  }, [smiteKey, router]);

  return (
    <DefaultLayout theme="secondary">
      <div>
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
        <p className="mt-4 mb-14 text-center text-lg text-white">
          SMITE KEY <br /> CHOICE
        </p>
        <Button
          className="w-full font-beaufort-bold"
          onClick={linkToPlayPage()}
        >
          START
        </Button>
      </div>
    </DefaultLayout>
  );

  function handleSpellKey(key: 'D' | 'F'): () => void {
    return () => {
      setSmiteKey(key);
    };
  }

  function linkToPlayPage(): () => void {
    const level = Object.keys(router.query);
    return () => {
      router.push(`/monster?${level[0]}`);
    };
  }
};

export default SettingPage;
