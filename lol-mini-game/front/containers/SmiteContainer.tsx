import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import GameResultBox from '../components/GameResultBox';
import MonsterHealthBar from '../components/HealthBar';
import MonsterImage from '../components/ObjectImage';
import DefaultLayout from '../layouts/DefaultLayout';
import { ObjectType } from '../types/object';
import {
  getObjectAbility,
  getNextLevel,
  MinMax,
  getObjectLevel,
} from '../utils/object';
import { getStorage } from '../utils/storage';

const SmiteContainer: React.FC = () => {
  const [object, setObject] = React.useState(ObjectType.DRAGON);

  return (
    <DefaultLayout
      titleClassName="mb-4 mt-8"
      theme="secondary"
      background="/images/backgrounds/background.png"
    >
      <div className="flex h-full w-full flex-col">
        <div className="mb-20 flex flex-col text-center text-white">
          <hr className="w-full border border-white" />
          <span className="mt-4 inline-block font-beaufort-bold text-base tracking-widest">
            {object.toUpperCase()}
          </span>
          <span className="mt-3 inline-block text-xs tracking-widest">
            LEVEL {getObjectLevel(object)}
          </span>
        </div>
        <div className="h-full w-full border border-white"></div>
      </div>
    </DefaultLayout>
  );
};

export default SmiteContainer;
