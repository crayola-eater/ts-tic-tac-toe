import clsx from 'clsx';
import type { Player, GameStatus } from '../../useTicTacToe/types';

export type StatusProps = {
  status: GameStatus;
  winner: null | Player;
  currentPlayer: null | Player;
};

function createStatusMessage({ winner, status, currentPlayer }: StatusProps) {
  if (status === 'FINISHED') {
    return winner ? `Game over, ${winner.name} (${winner.icon}) wins!` : 'Game over, nobody won!';
  } else if (currentPlayer) {
    return `Waiting for ${currentPlayer.name} (${currentPlayer.icon})...`;
  } else {
    return 'Getting ready, just a moment...';
  }
}

export default function Status(props: StatusProps) {
  const statusMessage = createStatusMessage(props);

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center',
        'bg-gray-200',
        'rounded-lg',
        'w-48 sm:w-72 md:w-96',
      )}
    >
      <span
        className={clsx(
          'p-2 md:p-4',
          'min-w-95',
          'font-sans',
          'text-center',
          'text-sm sm:text-lg md:text-xl',
          'tracking-widest',
        )}
      >
        {statusMessage}
      </span>
    </div>
  );
}
