import BoardSquare from '../BoardSquare/BoardSquare';
import type {
  GameStatus,
  HandleMove,
  BoardSquare as Square,
  Player,
} from '../../useTicTacToe/types';

export type BoardProps = {
  board: Square[];
  handleMove: HandleMove;
  status: GameStatus;
  currentPlayer: Player | null;
};

export default function Board({ board, handleMove, status, currentPlayer }: BoardProps) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-1 h-48 w-48 sm:h-72 sm:w-72 md:h-96 md:w-96 aspect-square">
      {board.map((square) => {
        return (
          <BoardSquare
            key={square.position}
            square={square}
            status={status}
            handleClick={() => {
              if (currentPlayer) {
                handleMove({
                  playerIcon: currentPlayer.icon,
                  squarePosition: square.position,
                });
              }
            }}
          />
        );
      })}
    </div>
  );
}
