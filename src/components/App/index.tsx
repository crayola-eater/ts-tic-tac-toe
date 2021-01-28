import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";
import useTicTacToe from "../../hooks/useTicTacToe";
import Board from "../Board";

const App: React.VFC = () => {
  const ticTacToe = useTicTacToe();

  useEffect(() => {
    [
      { icon: "🧟", name: "Bob" },
      { icon: "☠️", name: "Todd" },
    ].forEach(ticTacToe.playersManager.addPlayer);
  }, [ticTacToe.playersManager.addPlayer]);

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
      <Board
        board={ticTacToe.boardManager.board}
        currentPlayer={ticTacToe.playersManager.currentPlayer}
        gameHasFinished={ticTacToe.gameManager.gameHasFinished}
        handleMove={ticTacToe.handlers.handleMove}
      />
    </div>
  );
};

export default App;
