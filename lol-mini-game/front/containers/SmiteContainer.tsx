import Image from 'next/image';
import React from 'react';
import Button from '../components/Button';
import HealthBar from '../components/HealthBar';
import Modal from '../components/Modal';
import ObjectImage from '../components/ObjectImage';
import ScoreBoard from '../components/ScoreBoard';
import DefaultLayout from '../layouts/DefaultLayout';
import { SmiteKey } from '../types/game';
import Separator from '../public/images/separator.svg';
import { ObjectType } from '../types/object';
import { displayNumberSign } from '../utils/game';
import { getRandomNumber } from '../utils/math';
import {
  getNextLevel,
  getObjectAbility,
  getObjectLevel,
} from '../utils/object';
import { getStorage } from '../utils/storage';
import { useUpsertSmiteRank } from '../mutations/smite.rank';
import { useRouter } from 'next/router';

const SmiteContainer: React.FC = () => {
  const [object, setObject] = React.useState(ObjectType.DRAGON);

  const {
    HP: defaultHP,
    ATKRange,
    attackSpeedRange,
  } = getObjectAbility(object);

  const [ready, setReady] = React.useState(false);
  const [end, setEnd] = React.useState(false);

  const [HP, setHP] = React.useState(defaultHP);
  const [smiteKey, setSmiteKey] = React.useState<SmiteKey>(SmiteKey.D);

  const [scores, setScores] = React.useState<Array<number>>([]);

  const [visible, setVisible] = React.useState(false);
  const [summoner, setSummoner] = React.useState('');

  const gameScreenRef = React.useRef(null);
  const { upsertSmiteRank, error } = useUpsertSmiteRank();
  const currentLevel = getObjectLevel(object);

  const router = useRouter();

  React.useEffect(() => {
    if (!ready || end) return;
    const timeout = setTimeout(() => {
      setHP((prevHP) => {
        const nextHP = prevHP - getRandomNumber(ATKRange.min, ATKRange.max);

        if (nextHP <= 0) {
          setEnd(true);
          setScores(scores.concat([0]));

          return 0;
        }

        return nextHP > 1200 && nextHP < 1500 && currentLevel > 2
          ? nextHP - getRandomNumber(500, 700)
          : nextHP;
      });
    }, getRandomNumber(attackSpeedRange.min, attackSpeedRange.max));

    return () => clearTimeout(timeout);
  }, [ready, HP, end, object]);

  React.useEffect(() => {
    setHP(defaultHP);
    gameScreenRef.current.focus();
  }, [object, defaultHP]);

  React.useEffect(() => {
    setSmiteKey(getStorage('application:smite_key'));
  }, []);

  return (
    <DefaultLayout
      className="relative"
      titleClassName="mb-4 mt-8"
      theme="secondary"
      background="/images/backgrounds/background.png"
      hideFooterVersion
    >
      {(!ready || end) && (
        <div className="absolute z-30 h-full w-full border bg-black opacity-50" />
      )}
      {!ready && (
        <Button className="absolute top-1/2 z-40" onClick={startGame}>
          Ready?
        </Button>
      )}
      <div
        ref={gameScreenRef}
        className="flex h-full w-full flex-col outline-none"
        tabIndex={-1}
        onKeyDown={(e) => onSmite(e)}
        onBlur={foucsOnGameScreenElement}
      >
        <div className="z-40 mb-20 flex flex-col items-center text-center text-white">
          {!!Object.values(ObjectType)[getNextLevel(object) - 1] ? (
            <>
              <span className="mt-4 inline-block font-beaufort-bold text-base tracking-widest">
                {object.toUpperCase().replace(/_/g, ' ')}
              </span>
              <span className="mt-3 inline-block text-xs tracking-widest">
                LEVEL {getObjectLevel(object)}
              </span>
            </>
          ) : (
            <span className="mt-5 font-bold tracking-wider">GAME RESULT</span>
          )}
        </div>
        {!end ? (
          <div className="flex h-full w-full flex-col items-center justify-between">
            <HealthBar progressValue={(HP / defaultHP) * 100} health={HP} />

            <ObjectImage object={object} width={280} height={280} />

            <div className="relative flex h-14 w-14 items-center justify-center">
              <span className="absolute z-20 font-beaufort-bold text-3xl text-white">
                {smiteKey.replace(/Key/, '')}
              </span>
              <div className="absolute z-10 h-full w-full bg-red-100 opacity-30" />
              <Image
                className="absolute"
                src="/images/icon/smite.png"
                width={70}
                height={70}
                alt="smite"
              />
            </div>
          </div>
        ) : !!Object.values(ObjectType)[getNextLevel(object)] ? (
          <div className="relative z-40 flex w-full flex-col items-center">
            <h1 className="text-6xl font-bold tracking-widest text-white">
              COMPLETE
            </h1>

            <span className="mt-11 font-bold tracking-wider text-white">
              DAMAGE
            </span>
            <div className="border-b border-white px-6 pt-4 pb-3">
              <span className="text-4xl font-bold tracking-wider text-white">
                {displayNumberSign(scores[getObjectLevel(object) - 1]).replace(
                  ' ',
                  ''
                )}
              </span>
            </div>

            <ScoreBoard className="absolute right-40" scores={scores} />

            <Button
              className="mt-20 text-sm font-bold tracking-wider"
              size="lg"
              onClick={setNextLevel}
            >
              NEXT GAME
            </Button>

            <Button className="mt-52 text-sm font-bold" theme="clear">
              HOME
            </Button>
          </div>
        ) : (
          <>
            <Modal
              title="SUMMONER NAME"
              visible={visible}
              onClose={toggleModal}
            >
              <Separator
                className="mb-10 mt-5 stroke-brown-400"
                src="/images/separator.svg"
                width={320}
                height={20}
                alt="separator"
              />

              <div className="mt-2">
                <input
                  className="h-10 w-full border-none bg-light-gray-100 pl-2 outline-none"
                  value={summoner}
                  onChange={(e) => {
                    setSummoner(e.target.value);
                  }}
                />
              </div>

              <Button className="mt-7" size="lg" onClick={onRankScore}>
                REGISTRATION
              </Button>
            </Modal>
            <div className="z-40 flex h-full w-full flex-col items-center justify-center">
              <ScoreBoard size="lg" scores={scores} />

              <Button
                className="mt-20 text-sm font-bold tracking-widest"
                size="lg"
                onClick={toggleModal}
              >
                RANKING REGISTRATION
              </Button>

              <Button className="mt-32 text-sm font-bold" theme="clear">
                HOME
              </Button>
            </div>
          </>
        )}
      </div>
    </DefaultLayout>
  );

  function startGame() {
    setReady(true);
  }

  function setNextLevel() {
    setObject((prev) => {
      return Object.values(ObjectType)[getNextLevel(prev)];
    });

    resetGameState();
  }

  function resetGameState() {
    setReady(false);
    setEnd(false);
  }

  function onSmite(e: React.KeyboardEvent<HTMLDivElement>) {
    if (end || e.code !== smiteKey || !ready) return;

    setEnd(true);

    setHP((prevHP) => {
      const nextHP = prevHP - 900;

      setScores(scores.concat([nextHP]));

      if (nextHP <= 0) return 0;

      return nextHP;
    });
  }

  async function onRankScore() {
    const params = {
      summoner,
      dragon: scores[0],
      rift_herald: scores[1],
      baron_nashoor: scores[2],
      elder_dragon: scores[3],
      average: 0,
    };

    await upsertSmiteRank({
      variables: {
        upsertSmiteRankData: params,
      },
    });

    router.push('/smite_rank');
  }

  function toggleModal() {
    setVisible(!visible);
  }

  function foucsOnGameScreenElement() {
    if (end) return;
    gameScreenRef.current.focus();
  }
};

export default SmiteContainer;
