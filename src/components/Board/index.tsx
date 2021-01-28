import React from "react";
import { BoardProps } from "../../types/Board";
import BoardSquare from "../BoardSquare";

const Board: React.FC<BoardProps> = ({
  board,
  handleMove,
  gameHasFinished,
  currentPlayer,
}) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-1 m-2 h-48 w-48 sm:h-72 sm:w-72 md:h-96 md:w-96">
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
};

export default Board;
