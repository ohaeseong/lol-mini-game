import classNames from 'classnames';
import { sum } from 'lodash';
import Separator from '../public/images/separator.svg';
import { displayNumberSign } from '../utils/game';

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  size?: 'base' | 'lg';
  scores: Array<number>;
};

const ScoreBoard: React.FC<Props> = ({ className, size = 'base', scores }) => {
  return (
    <div
      className={classNames(
        'flex w-80 flex-col items-center text-white',
        className
      )}
    >
      <Separator
        className="stroke-white"
        src="/images/separator.svg"
        width={320}
        height={20}
        alt="game_score_separator"
      />

      <h1 className="font-bold tracking-wider">GAME SCORE</h1>
      <div
        className={classNames('mt-5 flex w-full flex-col space-y-2', {
          'mb-10': size === 'base',
          'mb-20': size === 'lg',
        })}
      >
        {scores.map((score, index) => (
          <div key={`${score}-${index}`}>
            <span className="mr-4 font-beaufort-bold">Lv {index + 1}</span>
            <span className="font-beaufort">{displayNumberSign(score)}</span>
          </div>
        ))}
      </div>
      <div
        className={classNames('flex w-full justify-between', {
          'text-base': size === 'base',
          'text-2xl': size === 'lg',
        })}
      >
        <span className="font-bold">Total Score</span>
        <span
          className={classNames('', {
            'tracking-wider': size === 'lg',
          })}
        >
          {displayNumberSign(sum(scores))}
        </span>
      </div>
    </div>
  );
};

export default ScoreBoard;
