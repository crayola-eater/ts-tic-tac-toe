import React, { useCallback } from "react";
import "tailwindcss/tailwind.css";
import useTicTacToe from "../../hooks/useTicTacToe";
import { StartMenuProps } from "../../types/StartMenu";
import Board from "../Board";
import StartMenu from "../StartMenu";
import Status from "../Status";

const App: React.VFC = () => {
  const ticTacToe = useTicTacToe();

  const handleStart = useCallback<StartMenuProps["handleStart"]>(
    (data) => {
      const playersData = [
        { icon: data.player1Icon, name: data.player1Name },
        { icon: data.player2Icon, name: data.player2Name },
      ];

      playersData.forEach(ticTacToe.playersManager.addPlayer);
    },
    [ticTacToe.playersManager.addPlayer]
  );

  if (0 === ticTacToe.playersManager.players.length) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <StartMenu handleStart={handleStart} />
      </div>
    );
  }

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
