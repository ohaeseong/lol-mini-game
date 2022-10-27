import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import Button from '../components/Button';
import Footer from '../components/Footer';
import dayjs from 'dayjs';
import { useRanks } from '../queries/smite.rank';
import Table from '../components/Table';
import { ISmiteRank } from '../../common/types/SmiteRank';
import { Column } from '../types/table';

const RankContainer: NextPage = () => {
  const { ranks, loading } = useRanks();
  const router = useRouter();
  const columns = useColumns();

  return (
    <div className="flex min-h-screen flex-col items-center justify-around">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mt-20 mb-5 font-beaufort-bold text-2xl tracking-widest text-brown-400">
          SMITE OF LEGENDS
        </h1>

        <hr className="mb-5 w-32 border-light-gray-100" />

        <h1 className="mt-0 mb-10 font-beaufort-bold text-xl tracking-widest">
          RANKING
        </h1>

        <Image
          src="/images/logos/opgg_logo.webp"
          width={300}
          height={200}
          alt="opgg_logo"
        />
        <span className="text-lg font-bold text-gray-200">
          Any other thoughts while playing?
        </span>
      </div>

      <Table<ISmiteRank>
        className="mt-6 mb-20"
        values={ranks}
        columns={columns}
        loading={loading}
      />

      <Button className="font-bold" size="lg" onClick={goToHome}>
        HOME
      </Button>

      <Footer hideVersion />
    </div>
  );

  function goToHome() {
    router.push('/');
  }
};

export default RankContainer;

function useColumns(): Column<ISmiteRank>[] {
  return [
    {
      key: 'summoner',
      label: 'Summoner',
      className: 'w-72 pt-5',
      headClassName: 'w-72 py-3',
      value: (value) => value.summoner,
      render: (value) => {
        return <span>{value.summoner}</span>;
      },
    },
    {
      key: 'average',
      label: 'Average',
      className: 'text-center w-40 pt-5',
      headClassName: 'text-center w-40 py-3',
      value: (value) => value.average,
      render: (value) => {
        return <div>{value.average}</div>;
      },
    },
    {
      key: 'dragon',
      label: 'Dragon',
      className: 'w-40 text-center pt-5',
      headClassName: 'w-40 text-center',
      value: (value) => value.dragon,
      render: (value) => {
        return <span>{value.dragon}</span>;
      },
    },
    {
      key: 'rift_herald',
      label: 'Rift herald',
      className: 'w-40 text-center pt-5',
      headClassName: 'w-40 text-center',
      value: (value) => value.rift_herald,
      render: (value) => {
        return <span>{value.rift_herald}</span>;
      },
    },
    {
      key: 'baron_nashoor',
      label: 'Baron nashoor',
      className: 'w-40 text-center pt-5',
      headClassName: 'w-40 text-center',
      value: (value) => value.baron_nashoor,
      render: (value) => {
        return <span>{value.baron_nashoor}</span>;
      },
    },
    {
      key: 'elder_dragon',
      label: 'Elder dragon',
      className: 'w-40 text-center pt-5',
      headClassName: 'w-40 text-center',
      value: (value) => value.elder_dragon,
      render: (value) => {
        return <span>{value.elder_dragon}</span>;
      },
    },
    {
      key: 'count',
      label: 'Challenge Count',
      className: 'w-40 text-center pt-5',
      headClassName: 'w-40 text-center',
      value: (value) => value.count,
      render: (value) => {
        return <span>{value.count}</span>;
      },
    },
    {
      key: 'updated_at',
      label: 'Updated At',
      className: 'w-40 text-center pt-5',
      headClassName: 'w-40 text-center',
      value: (value) => value.updated_at,
      render: (value) => {
        return (
          <span>{dayjs(value.updated_at).format('YYYY-MM-DD hh:mm:ss')}</span>
        );
      },
    },
    {
      key: 'created_at',
      label: 'Created At',
      className: 'w-40 text-center pt-5',
      headClassName: 'w-40 text-center',
      value: (value) => value.created_at,
      render: (value) => {
        return (
          <span>{dayjs(value.created_at).format('YYYY-MM-DD hh:mm:ss')}</span>
        );
      },
    },
  ];
}
