import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";
import useTicTacToe from "../../hooks/useTicTacToe";
import Board from "../Board";
import Status from "../Status";

const App: React.VFC = () => {
  const ticTacToe = useTicTacToe();

  useEffect(() => {
    [
      { icon: "🧟", name: "Bob" },
      { icon: "☠️", name: "Todd" },
    ].forEach(ticTacToe.playersManager.addPlayer);
  }, [ticTacToe.playersManager.addPlayer]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <Status
        currentPlayer={ticTacToe.playersManager.currentPlayer}
        gameHasFinished={ticTacToe.gameManager.gameHasFinished}
        winner={ticTacToe.gameManager.winner}
      />
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
