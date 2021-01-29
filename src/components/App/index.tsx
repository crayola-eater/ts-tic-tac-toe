import React from "react";
import "tailwindcss/tailwind.css";
import useTicTacToe from "../../hooks/useTicTacToe";
import Board from "../Board";
import ResponsiveWrapper from "../ResponsiveWrapper";
import Score from "../Score";
import StartMenu from "../StartMenu";
import Status from "../Status";

const App: React.VFC = () => {
  const ticTacToe = useTicTacToe();

  let children = null;

  if (0 === ticTacToe.playersManager.players.length) {
    children = <StartMenu handleStart={ticTacToe.handlers.handleStart} />;
  } else {
    children = (
      <>
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
      </>
    );
  }

  return <ResponsiveWrapper>{children}</ResponsiveWrapper>;
};

export default App;
