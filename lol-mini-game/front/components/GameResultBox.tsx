import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import Button from './Button';
import { useRouter } from 'next/router';

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  onClose?: () => void;
  visible: boolean;
  isWin: boolean;
  point: number;
};

const GameResultBox: React.FC<Props> = ({
  className,
  onClose,
  visible,
  isWin,
  point,
}: Props) => {
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
              {isWin ? 'WIN!' : 'LOSE..'}
            </span>
            <span className="mt-4 inline-block text-lg">
              your point: {point}
            </span>
            <input
              className="mt-4 rounded border border-brown-400 py-1 pl-2 focus:outline-none"
              placeholder="If you want to rank your point, Please write your LOL nick name."
            />
            <div className="mt-4 flex space-x-4">
              <Button className="rounded" onClick={onReload}>
                Retry
              </Button>
              <Button className="rounded">Rank</Button>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );

  function onReload() {
    router.reload();
  }
};

export default GameResultBox;
