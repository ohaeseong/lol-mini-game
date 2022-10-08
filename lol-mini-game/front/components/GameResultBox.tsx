import React from 'react';
import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import Button from './Button';
import { useRouter } from 'next/router';
import { useAddRank } from '../mutations/smite.rank';
import { MonsterType } from './ObjectCard';
import { getNextLevel } from '../utils/object';

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  currentLevel: MonsterType;
  onClose?: () => void;
  visible: boolean;
  isSuccess: boolean;
  isEnd: boolean;
  point: number;
};

const GameResultBox: React.FC<Props> = ({
  className,
  currentLevel,
  onClose,
  visible,
  isSuccess,
  isEnd,
  point,
}: Props) => {
  const [summoner, setSummoner] = React.useState('');
  const { addRank } = useAddRank();
  const router = useRouter();

  return (
    <>
      {visible && (
        <div className="absolute z-20 flex h-screen w-screen items-center justify-center bg-black opacity-60" />
      )}

      <Transition
        className="fixed inset-0 z-50 transform overflow-y-scroll transition-all duration-500"
        as="div"
        enterFrom="opacity-0 translate-y-full"
        enterTo="opacity-100 translate-y-0"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-full"
        show={visible}
        onClick={onClose}
      >
        <div
          className={classNames(
            ' flex h-screen w-full items-center justify-center',
            className
          )}
        >
          <div className="flex flex-col rounded bg-white p-4">
            <span className="text-2xl font-bold text-brown-400">
              {isSuccess ? 'SUCCESS!' : 'FAIL..'}
            </span>
            <span className="mt-4 inline-block text-lg">
              your point: {point}
            </span>
            {isEnd && isSuccess && (
              <input
                className="mt-4 rounded border border-brown-400 py-1 pl-2 focus:outline-none"
                placeholder="If you want to rank your point, Please write your LOL nick name."
                onChange={handleSummoner}
                value={summoner}
              />
            )}
            <div className="mt-4 flex space-x-4">
              {isSuccess ? (
                <>
                  <Button className="rounded" onClick={onReload}>
                    Retry
                  </Button>
                  <Button className="rounded" onClick={isEnd ? onRank : onNext}>
                    {isEnd ? 'Rank' : 'Next'}
                  </Button>
                </>
              ) : (
                <Button className="rounded" onClick={onReload}>
                  Retry
                </Button>
              )}
            </div>
          </div>
        </div>
      </Transition>
    </>
  );

  function onReload() {
    router.reload();
  }

  function handleSummoner(event) {
    setSummoner(event.target.value);
  }

  async function onRank() {
    if (!summoner) {
      window.alert('소환사 이름을 작성해 주세요.');
      return;
    }

    const dragonPoint = Math.abs(
      Number(sessionStorage.getItem(MonsterType.DRAGON))
    );
    const riftPoint = Math.abs(
      Number(sessionStorage.getItem(MonsterType.RIFT_HERALD))
    );
    const baronPoint = Math.abs(
      Number(sessionStorage.getItem(MonsterType.BARON_NASHOOR))
    );
    const elderPoint = Math.abs(Number(point));

    await addRank({
      variables: {
        createSmiteRankData: {
          average: 0,
          summoner: summoner,
          dragon: dragonPoint,
          rift_herald: riftPoint,
          baron_nashoor: baronPoint,
          elder_dragon: elderPoint,
        },
      },
    });

    await router.push('/smite_rank');
  }

  async function onNext() {
    const nextLevel = getNextLevel(currentLevel) as MonsterType;

    sessionStorage.setItem(currentLevel, point.toString());

    await router.push(`/monster?${nextLevel}`);
    await router.reload();
  }
};

export default GameResultBox;
