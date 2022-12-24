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
import { remove, sum } from 'lodash';
import classNames from 'classnames';

const SmiteContainer: React.FC = () => {
  const [object, setObject] = React.useState(ObjectType.DRAGON);

  const {
    HP: defaultHP,
    ATKRange,
    attackSpeedRange,
  } = getObjectAbility(object);

  const [ready, setReady] = React.useState(false);
  const [end, setEnd] = React.useState(false);
  const [fail, setFail] = React.useState(false);

  const [HP, setHP] = React.useState(defaultHP);
  const [smiteKey, setSmiteKey] = React.useState<SmiteKey>(SmiteKey.D);

  const nextLevel = Object.values(ObjectType)[getNextLevel(object)];

  const [scores, setScores] = React.useState<Array<number>>([]);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [summoner, setSummoner] = React.useState('');

  const { upsertSmiteRank } = useUpsertSmiteRank();
  const gameScreenRef = React.useRef(null);
  const currentLevel = getObjectLevel(object);

  const router = useRouter();

  React.useEffect(() => {
    const confirmMessage =
      '게임이 진행 중 입니다. 새로고침/페이지 이동 시 점수가 초기화 될 수 있습니다.';

    function handleCloseWindow(e: any) {
      e.preventDefault();
      return (e.returnValue = confirmMessage);
    }

    function handleAbort(page) {
      if (page === '/smite_rank') return;

      if (!window.confirm(confirmMessage)) {
        router.events.emit('routeChangeError', 'cancelRoute');
        throw 'cancelRoute';
      }
    }

    router.events.on('beforeHistoryChange', handleAbort);
    window.addEventListener('beforeunload', handleCloseWindow);

    return () => {
      router.events.off('beforeHistoryChange', handleAbort);
      window.removeEventListener('beforeunload', handleCloseWindow);
    };
  }, [router.events]);

  React.useEffect(() => {
    if (!ready || end) return;
    const timeout = setTimeout(() => {
      setHP((prevHP) => {
        const nextHP = prevHP - getRandomNumber(ATKRange.min, ATKRange.max);

        if (nextHP <= 0) {
          setEnd(true);
          setFail(true);

          return 0;
        }

        return nextHP > 1200 && nextHP < 1500 && currentLevel > 2
          ? nextHP - getRandomNumber(500, 700)
          : nextHP;
      });
    }, getRandomNumber(attackSpeedRange.min, attackSpeedRange.max));

    return () => clearTimeout(timeout);
  }, [
    ready,
    HP,
    end,
    object,
    attackSpeedRange.min,
    attackSpeedRange.max,
    ATKRange.min,
    ATKRange.max,
    currentLevel,
  ]);

  React.useEffect(() => {
    setHP(defaultHP);
    gameScreenRef.current.focus();
  }, [object, defaultHP, ready]);

  React.useEffect(() => {
    setSmiteKey(getStorage('application:smite_key') || SmiteKey.D);
  }, []);

  return (
    <DefaultLayout
      className="relative"
      titleClassName="mb-4 mt-8"
      theme="secondary"
      background={
        currentLevel === 1 || currentLevel === 4
          ? '/images/backgrounds/background.png'
          : '/images/backgrounds/background_2.png'
      }
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
        {end ? (
          <>
            {fail ? (
              <div className="relative z-40 flex h-full w-full animate-fade-in flex-col items-center justify-around">
                <h1 className="text-6xl font-bold tracking-widest text-white">
                  FAIL
                </h1>

                <Button
                  className="text-sm font-bold tracking-wider"
                  size="lg"
                  onClick={retryGame}
                >
                  RETRY
                </Button>
              </div>
            ) : nextLevel ? (
              <div className="relative z-40 flex h-full w-full animate-fade-in flex-col items-center justify-around">
                <h1 className="text-6xl font-bold tracking-widest text-white">
                  COMPLETE
                </h1>

                <div className="flex flex-col items-center justify-center">
                  <span className="font-bold tracking-wider text-white">
                    DAMAGE
                  </span>
                  <div className="border-b border-white px-6 pt-4 pb-3">
                    <span className="text-4xl font-bold tracking-wider text-white">
                      {displayNumberSign(
                        scores[getObjectLevel(object) - 1]
                      ).replace(' ', '')}
                    </span>
                  </div>
                </div>

                <ScoreBoard
                  className="absolute right-40 top-0"
                  scores={scores}
                />

                <Button
                  className="text-sm font-bold tracking-wider"
                  size="lg"
                  onClick={setNextLevel}
                >
                  NEXT GAME
                </Button>

                <Button
                  className="text-sm font-bold"
                  theme="clear"
                  onClick={retryGame}
                >
                  RETRY
                </Button>
              </div>
            ) : (
              <>
                <Modal
                  title="SUMMONER NAME"
                  visible={modalVisible}
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

                  <Button
                    className="mt-32 text-sm font-bold"
                    theme="clear"
                    onClick={retryGame}
                  >
                    RETRY
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-between">
            <HealthBar progressValue={(HP / defaultHP) * 100} health={HP} />

            <div
              className={classNames({
                'ml-40':
                  ObjectType.ELDER_DRAGON === object ||
                  ObjectType.DRAGON === object,
              })}
            >
              <ObjectImage
                object={object}
                width={350}
                height={350}
                type="game"
              />
            </div>

            <div>
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

              <div className="w-full text-center font-beaufort-bold text-xl text-white">
                {900}
              </div>
            </div>
          </div>
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

  function retryGame() {
    resetGameState();
    removeCurrentLevelScore();
  }

  function resetGameState() {
    setReady(false);
    setEnd(false);
    setFail(false);
  }

  function removeCurrentLevelScore() {
    setScores((prev) => {
      remove(prev, (_score, index) => {
        return index === getObjectLevel(object) - 1;
      });

      return prev;
    });
  }

  function onSmite(e: React.KeyboardEvent<HTMLDivElement>) {
    if (end || e.code !== smiteKey || !ready) return;

    setHP((prevHP) => {
      const nextHP = prevHP - 900;

      if (nextHP > 0) {
        setFail(true);
      } else {
        const test = [...scores, nextHP];
        setScores(test);
      }

      setEnd(true);

      return nextHP;
    });
  }

  async function onRankScore() {
    if (!summoner) {
      window.alert('이름을 작성해 주세요.');
      return;
    }

    const params = {
      summoner,
      dragon: scores[0],
      rift_herald: scores[1],
      baron_nashoor: scores[2],
      elder_dragon: scores[3],
      average: Math.ceil(sum(scores) / 4),
    };

    await upsertSmiteRank({
      variables: {
        upsertSmiteRankData: params,
      },
    });

    router.push('/smite_rank');
  }

  function toggleModal() {
    setModalVisible(!modalVisible);
  }

  function foucsOnGameScreenElement() {
    if (end) return;
    gameScreenRef.current.focus();
  }
};

export default SmiteContainer;
