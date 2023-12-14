import BoardSquare from '../BoardSquare/BoardSquare';
import type { Board } from '../../hooks/useBoardManager';
import type { HandleMove } from '../../hooks/useTicTacToe';
import type { Player } from '../../hooks/usePlayersManager';

export type BoardProps = {
  board: Board;
  handleMove: HandleMove;
  gameHasFinished: boolean;
  currentPlayer: Player;
};

export default function Board({ board, handleMove, gameHasFinished, currentPlayer }: BoardProps) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-1 h-48 w-48 sm:h-72 sm:w-72 md:h-96 md:w-96">
      {board.map((square) => {
        return (
          <BoardSquare
            key={square.position}
            square={square}
            gameHasFinished={gameHasFinished}
            handleClick={() => handleMove(square.position, currentPlayer)}
          />
        );
      })}
    </div>
  );
}
