import clsx from 'clsx';
import type { Winner } from '../../hooks/useGameManager';
import type { Player } from '../../hooks/usePlayersManager';

export type StatusProps = {
  gameHasFinished: boolean;
  winner: Winner;
  currentPlayer?: Player;
};

export default function Status({ currentPlayer, gameHasFinished, winner }: StatusProps) {
  let statusMessage;
  if (gameHasFinished) {
    statusMessage = winner
      ? `Game over, ${winner.name} (${winner.icon}) wins!`
      : 'Game over, nobody won!';
  } else if (currentPlayer) {
    statusMessage = `Waiting for ${currentPlayer.name} (${currentPlayer.icon})...`;
  } else {
    statusMessage = 'Getting ready, just a moment...';
  }

  return (
    <div
      className={clsx(
        'w-full',
        'flex flex-col items-center justify-center',
        'bg-gray-200',
        'rounded-lg',
      )}
    >
      <span
        className={clsx(
          'p-2 md:p-4',
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
