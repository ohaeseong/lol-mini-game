import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { MonsterType } from '../../components/MonsterCard';
import MonsterSmiteContainer from '../../containers/MonsterSmiteContainer';

const MonsterPage: NextPage = () => {
  const router = useRouter();
  const monster = Object.keys(router.query)[0] as MonsterType;

  return <MonsterSmiteContainer monster={monster} />;
};

export default MonsterPage;
