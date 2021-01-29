import React from "react";
import "tailwindcss/tailwind.css";
import useTicTacToe from "../../hooks/useTicTacToe";
import Board from "../Board";
import Score from "../Score";
import StartMenu from "../StartMenu";
import Status from "../Status";

const App: React.VFC = () => {
  const ticTacToe = useTicTacToe();

  if (0 === ticTacToe.playersManager.players.length) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <StartMenu handleStart={ticTacToe.handlers.handleStart} />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen space-y-3">
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
      <Score players={ticTacToe.playersManager.players} />
    </div>
  );
};

export default App;
