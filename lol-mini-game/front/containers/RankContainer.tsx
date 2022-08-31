import classNames from 'classnames';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import Button from '../components/Button';
import Footer from '../components/Footer';
import { useRanks } from '../queries/rank';

const TABLE_HEAD = [
  {
    label: '#',
  },
  {
    label: 'summoner',
  },
  {
    label: 'score',
  },
];

const RankContainer: NextPage = () => {
  const { ranks, loading } = useRanks();
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mt-20 mb-5 font-beaufort-bold text-2xl tracking-widest text-brown-400">
        SMITE OF LEGENDS
      </h1>

      <hr className="mb-5 w-32 border-light-gray-100" />

      <h1 className="mb-10 font-beaufort-bold text-xl tracking-widest">
        RANKING
      </h1>

      <Image
        src="/images/logos/opgg_logo.webp"
        width={300}
        height={200}
        alt="opgg_logo"
      />
      <span className="font-bold text-gray-200">
        Any other thoughts while playing?
      </span>

      <hr className="mt-10 w-1/4 border-brown-400" />

      <table className="mt-6 mb-20 min-h-fit w-1/2">
        <thead className="border-b border-brown-400 pb-10">
          {TABLE_HEAD.map((th) => (
            <th
              key={th.label}
              className={classNames(
                'py-3 text-left font-beaufort-bold text-xs',
                {
                  'pl-5': th.label === '#',
                }
              )}
            >
              {th.label}
            </th>
          ))}
        </thead>
        {loading ? (
          'Loading...'
        ) : (
          <tbody className="table-auto">
            {ranks.map((rank, index) => (
              <tr key={rank.id} className="font-beaufort-bold">
                <Td className="pl-5 pt-5" index={index}>
                  {index + 1}
                </Td>
                <Td index={index}>{rank.summoner}</Td>
                <Td index={index}>{rank.score}</Td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      <span>
        <Button className="font-bold" size="lg" onClick={goToHome}>
          HOME
        </Button>
      </span>

      <Footer isShowVersion={false} />
    </div>
  );

  function goToHome() {
    router.push('/');
  }
};

export default RankContainer;

const Td: React.FC<
  React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  > & { index: number }
> = ({ className, children, index }) => {
  return (
    <td
      className={classNames(
        'pt-5 text-xs',
        { 'text-brown-400': index < 3 },
        className
      )}
    >
      {children}
    </td>
  );
};
