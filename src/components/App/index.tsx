import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";
import useTicTacToe from "../../hooks/useTicTacToe";

const App: React.VFC = () => {
  const ticTacToe = useTicTacToe();

  useEffect(() => {
    [
      { icon: "🧟", name: "Bob" },
      { icon: "☠️", name: "Todd" },
    ].forEach(ticTacToe.playersManager.addPlayer);
  }, [ticTacToe.playersManager.addPlayer]);

  const board = (
    <div className="grid grid-cols-3 gap-1 h-96 w-96">
      {ticTacToe.boardManager.board.map((square) => {
        return (
          <button
            key={square.position}
            className={`shadow shadow-inner rounded flex flex-col justify-center items-center border border-red-500 border-solid text-xl ${
              square.isWinning ? "bg-yellow-500" : ""
            }
            ${
              ticTacToe.gameManager.gameHasFinished && !square.isWinning
                ? "bg-gray-400 opacity-40"
                : ""
            }`}
            onClick={() => {
              ticTacToe.handlers.handleMove(
                square.position,
                ticTacToe.playersManager.currentPlayer
              );
            }}
            disabled={ticTacToe.gameManager.gameHasFinished}
          >
            <span className={square.isWinning ? "animate-bounce" : undefined}>
              {square.occupiedBy}
            </span>
          </button>
        );
      })}
    </div>
  );

  const gameStatus = (
    <div>
      <h1>
        {!ticTacToe.gameManager.gameHasFinished &&
        ticTacToe.playersManager.currentPlayer
          ? "Waiting for " +
            ticTacToe.playersManager.currentPlayer.name +
            " " +
            ticTacToe.playersManager.currentPlayer.icon +
            " to move..."
          : ticTacToe.gameManager.winner
          ? "Game has been won by: " +
            ticTacToe.gameManager.winner.name +
            " " +
            ticTacToe.gameManager.winner.icon
          : "No winner, it's a tie!"}
      </h1>
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      {gameStatus}
      {board}
    </div>
  );
};

export default App;
