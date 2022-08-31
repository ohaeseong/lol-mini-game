import classNames from 'classnames';
import React from 'react';
import MonsterCard, { MonsterType } from './MonsterCard';

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  selectedMonster: MonsterType;
  disableSelect?: boolean;
  onChange: (type: MonsterType) => void;
};

const MonsterSelector: React.FC<Props> = ({
  className,
  selectedMonster,
  disableSelect,
  onChange,
}: Props) => {
  return (
    <div className={classNames('flex border border-brown-100', className)}>
      {Object.values(MonsterType).map((monster: MonsterType, index: number) => (
        <div key={`${monster}-${index}`} onClick={handleClick(monster)}>
          <MonsterCard
            className="cursor-pointer"
            type={monster}
            level={index + 1}
            selected={!disableSelect ? monster === selectedMonster : true}
          />
        </div>
      ))}
    </div>
  );

  function handleClick(type: MonsterType) {
    if (disableSelect) return;

    return () => {
      onChange(type);
    };
  }
};

export default MonsterSelector;
