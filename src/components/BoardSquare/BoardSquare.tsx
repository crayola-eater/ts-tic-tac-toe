import clsx from 'clsx';
import type { BoardSquare } from '../../hooks/useBoardManager';
import type { TicTacToe } from '../../hooks/useTicTacToe';

export type BoardSquareProps = {
  square: BoardSquare;
  handleClick: () => void;
  gameHasFinished: TicTacToe['gameManager']['gameHasFinished'];
};

export default function BoardSquare({ square, handleClick, gameHasFinished }: BoardSquareProps) {
  const className = clsx(
    'shadow-md',
    'rounded',
    'flex flex-col justify-center items-center',
    'border border-gray-500 border-solid',
    'transition-colors duration-200 ease-linear',
    { ['hover:bg-gray-200']: !gameHasFinished },
    { ['bg-gray-200']: square.isOccupied },
    { ['bg-yellow-500']: square.isWinning },
    { ['bg-gray-200 opacity-40']: gameHasFinished && !square.isWinning },
  );

  return (
    <button className={className} onClick={handleClick} disabled={gameHasFinished}>
      <span
        className={clsx('text-3xl md:text-4xl lg:text-5xl', {
          ['animate-bounce']: square.isWinning,
        })}
      >
        {square.occupiedBy}
      </span>
    </button>
  );
}
