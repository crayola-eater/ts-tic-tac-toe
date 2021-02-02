import { useCallback, useEffect } from "react";

import usePlayersManager from "./usePlayersManager";
import useBoardManager from "./useBoardManager";
import { TicTacToe, UseTicTacToe } from "../types/useTicTacToe";
import useGameManager from "./useGameManager";
import { BoardSquare } from "../types/useBoardManager";

const checkGameResult = (squares: BoardSquare[]) => {
  const combinationsToCheck = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const winningCombinations = combinationsToCheck.filter(([a, b, c]) => {
    return (
      squares[a].isOccupied &&
      squares[a].occupiedBy === squares[b].occupiedBy &&
      squares[a].occupiedBy === squares[c].occupiedBy
    );
  });

  const gameHasBeenWon = winningCombinations.length > 0;
  const gameHasBeenDrawn =
    !gameHasBeenWon && squares.every((square) => square.isOccupied);
  const gameHasNotEnded = !gameHasBeenWon && !gameHasBeenDrawn;

  const indexOfWinningSquare = winningCombinations[0]?.[0];
  const iconOfWinner = squares[indexOfWinningSquare]?.occupiedBy;

  return {
    gameHasBeenWon,
    gameHasBeenDrawn,
    gameHasNotEnded,
    winningCombinations,
    iconOfWinner,
  };
};

const useTicTacToe: UseTicTacToe = () => {
  const boardManager = useBoardManager();
  const playersManager = usePlayersManager();
  const gameManager = useGameManager();

  const handleMove = useCallback<TicTacToe["handlers"]["handleMove"]>(
    (index, player) => {
      if (gameManager.gameHasFinished) {
        return;
      }

      const squareClicked = boardManager.board[index];
      if (squareClicked.isOccupied) {
        return;
      }
      boardManager.setSquareAsOccupied.call(undefined, index, player);
      gameManager.incrementCurrentMoveIndex.call(undefined);
    },
    [
      boardManager.board,
      boardManager.setSquareAsOccupied,
      gameManager.gameHasFinished,
      gameManager.incrementCurrentMoveIndex,
    ]
  );

  const handleStart = useCallback<TicTacToe["handlers"]["handleStart"]>(
    (data) => {
      const playersData = [
        { icon: data.player1Icon, name: data.player1Name },
        { icon: data.player2Icon, name: data.player2Name },
      ].map((player, i) => {
        /**
         * TODO: The responsibility for adding score and index should be usePlayersManager's,
         * not the caller's.
         */
        return {
          ...player,
          score: 0,
          index: playersManager.players.length + i,
        };
      });
      playersData.forEach(playersManager.addPlayer);
      gameManager.setGameAsStarted.call(undefined);
    },
    [
      playersManager.players.length,
      playersManager.addPlayer,
      gameManager.setGameAsStarted,
    ]
  );

  const handleRestart = useCallback(() => {
    boardManager.resetBoard.call(undefined);
    gameManager.resetGame.call(undefined);
  }, [boardManager.resetBoard, gameManager.resetGame]);

  /**
   * After each move, check if game has been won/drawn or should continue.
   */
  useEffect(() => {
    if (!gameManager.gameHasStarted || gameManager.gameHasFinished) {
      return;
    } else if (0 === gameManager.currentMoveIndex) {
      return;
    }

    const result = checkGameResult(boardManager.board);

    if (result.gameHasNotEnded) {
      playersManager.setNextPlayer.call(undefined);
      return;
    }

    if (result.gameHasBeenDrawn) {
      gameManager.setGameAsFinished.call(undefined);
      return;
    }

    if (result.gameHasBeenWon) {
      const winner = playersManager.players.find(
        (player) => player.icon === result.iconOfWinner
      )!;

      gameManager.setGameAsFinished.call(undefined);
      gameManager.setGameWinner.call(undefined, winner);
      boardManager.setSquaresAsWinning.call(
        undefined,
        result.winningCombinations
      );
      playersManager.incrementPlayerScore.call(undefined, winner.index);
    }
  }, [
    playersManager.players,
    playersManager.incrementPlayerScore,
    playersManager.setNextPlayer,
    gameManager.gameHasStarted,
    gameManager.gameHasFinished,
    gameManager.currentMoveIndex,
    gameManager.setGameAsFinished,
    gameManager.setGameWinner,
    boardManager.board,
    boardManager.setSquaresAsWinning,
  ]);

  /**
   * Auto-restart the game when it has finished.
   */
  useEffect(() => {
    if (gameManager.gameHasFinished) {
      const timeoutId = setTimeout(handleRestart, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [handleRestart, gameManager.gameHasFinished]);

  return {
    boardManager,
    playersManager,
    gameManager,
    handlers: {
      handleMove,
      handleStart,
      handleRestart,
    },
  };
};

export default useTicTacToe;
