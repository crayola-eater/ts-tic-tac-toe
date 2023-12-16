import clsx from 'clsx';
import type { GameStatus, BoardSquare } from '../../useTicTacToe/types';

export type BoardSquareProps = {
  square: BoardSquare;
  handleClick: () => void;
  status: GameStatus;
};

export default function BoardSquare({ square, handleClick, status }: BoardSquareProps) {
  const className = clsx(
    'shadow-md',
    'rounded',
    'flex flex-col justify-center items-center',
    'border border-gray-500 border-solid',
    'transition-colors duration-200 ease-linear',
    {
      ['hover:bg-gray-200']: status !== 'FINISHED',
      ['bg-gray-200']: square.isOccupied,
      ['bg-yellow-500']: square.isWinning,
      ['bg-gray-200 opacity-40']: status === 'FINISHED' && !square.isWinning,
    },
  );

  const label = square.isOccupied
    ? `Square ${square.position + 1} has already been picked by ${square.occupiedBy}`
    : `Select square ${square.position + 1}`;

  return (
    <button
      className={className}
      onClick={status === 'IN_PROGRESS' && !square.isOccupied ? handleClick : undefined}
      disabled={status === 'FINISHED' || square.isOccupied}
      aria-label={label}
    >
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
