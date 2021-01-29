import { useCallback, useEffect } from "react";

import usePlayersManager from "./usePlayersManager";
import useBoardManager from "./useBoardManager";
import { TicTacToe, UseTicTacToe } from "../types/useTicTacToe";
import useGameManager from "./useGameManager";
import { BoardSquare } from "../types/useBoardManager";

const calculateWinner = (squares: BoardSquare[]) => {
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

  return {
    gameHasBeenWon: winningCombinations.length > 0,
    winningCombinations,
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
      boardManager.setSquareAsOccupied(index, player);
    },
    [boardManager, gameManager]
  );

  const handleStart = useCallback<TicTacToe["handlers"]["handleStart"]>(
    (data) => {
      const playersData = [
        { icon: data.player1Icon, name: data.player1Name },
        { icon: data.player2Icon, name: data.player2Name },
      ];
      playersData.forEach(playersManager.addPlayer);
      gameManager.setGameAsStarted();
    },
    [playersManager.addPlayer, gameManager.setGameAsStarted]
  );

  /**
   * Check if there's a tie.
   */
  useEffect(() => {
    if (!gameManager.gameHasStarted || gameManager.gameHasFinished) {
      return;
    }
    if (boardManager.board.every((square) => square.isOccupied)) {
      gameManager.setGameAsFinished();
    }
  }, [
    gameManager.gameHasFinished,
    gameManager.setGameAsFinished,
    boardManager.board,
  ]);

  /**
   * Check if there's a win.
   */
  useEffect(() => {
    if (!gameManager.gameHasStarted || gameManager.gameHasFinished) {
      return;
    }

    const result = calculateWinner(boardManager.board);
    if (!result.gameHasBeenWon) {
      playersManager.setNextPlayer();
      return;
    }

    const indexOfWinningSquare = result.winningCombinations[0][0];
    const iconOfWinner = boardManager.board[indexOfWinningSquare].occupiedBy;
    const winner = playersManager.players.filter(
      (player) => player.icon === iconOfWinner
    )[0];

    gameManager.setGameAsFinished();
    gameManager.setGameWinner(winner);
    boardManager.setSquaresAsWinning(result.winningCombinations);
  }, [
    gameManager.setGameAsFinished,
    gameManager.setGameWinner,
    boardManager.board,
    boardManager.setSquaresAsWinning,
    playersManager.setNextPlayer,
    playersManager.players,
  ]);

  return {
    boardManager,
    playersManager,
    gameManager,
    handlers: {
      handleMove,
      handleStart,
    },
  };
};

export default useTicTacToe;
