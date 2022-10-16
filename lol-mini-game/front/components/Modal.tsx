import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  children: React.ReactNode;
  visible: boolean;
  title?: string;
  onClose?: () => void;
};

const Modal: React.FC<Props> = ({
  className,
  children,
  visible,
  title,
  onClose,
}: Props) => {
  return (
    <Transition
      className={classNames(
        'fixed inset-0 z-50 transform overflow-y-scroll transition-all duration-500',
        className
      )}
      as="div"
      enterFrom="opacity-0 translate-y-full"
      enterTo="opacity-100 translate-y-0"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-full"
      show={visible}
    >
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white py-7 px-20 transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 tracking-wider text-brown-400"
                >
                  {title}
                </Dialog.Title>

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
