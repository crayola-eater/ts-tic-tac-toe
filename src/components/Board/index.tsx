import React from "react";
import clsx from "clsx";
import { BoardProps } from "../../types/Board";

const Board: React.FC<BoardProps> = ({
  board,
  handleMove,
  gameHasFinished,
  currentPlayer,
}) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-1 m-2 h-48 w-48 sm:h-72 sm:w-72 md:h-96 md:w-96">
      {board.map((square) => {
        const className = clsx(
          "shadow-md",
          "rounded",
          "flex flex-col justify-center items-center",
          "border border-gray-500 border-solid",
          "transition-colors duration-200 ease-linear",
          { ["hover:bg-gray-300"]: !gameHasFinished },
          { ["bg-gray-300"]: square.isOccupied },
          { ["bg-yellow-500"]: square.isWinning },
          { ["bg-gray-400 opacity-40"]: gameHasFinished && !square.isWinning }
        );

        return (
          <button
            key={square.position}
            className={className}
            onClick={() => {
              handleMove(square.position, currentPlayer);
            }}
            disabled={gameHasFinished}
          >
            <span
              className={clsx("text-3xl md:text-4xl lg:text-5xl", {
                ["animate-bounce"]: square.isWinning,
              })}
            >
              {square.occupiedBy}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Board;
