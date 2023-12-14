import { useCallback, useEffect } from 'react';
import usePlayersManager, { type Player, PlayersManager } from './usePlayersManager';
import useBoardManager, { type BoardSquare, BoardManager } from './useBoardManager';
import useGameManager, { type GameManager } from './useGameManager';
import type { StartMenuFormData } from '../components/StartMenu/StartMenu';

export type TicTacToe = {
  boardManager: BoardManager;
  playersManager: PlayersManager;
  gameManager: GameManager;
  handlers: {
    handleMove: (index: number, player: Player) => void;
    handleStart: (data: StartMenuFormData) => void;
    handleRestart: () => void;
  };
};
export type HandleMove = TicTacToe['handlers']['handleMove'];
export type HandleStart = TicTacToe['handlers']['handleStart'];
export type handleRestart = TicTacToe['handlers']['handleRestart'];

function checkGameResult(squares: BoardSquare[]) {
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
  const gameHasBeenDrawn = !gameHasBeenWon && squares.every((square) => square.isOccupied);
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
}

export default function useTicTacToe(): TicTacToe {
  const boardManager = useBoardManager();
  const playersManager = usePlayersManager();
  const gameManager = useGameManager();

  const handleMove = useCallback<HandleMove>(
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
    ],
  );

  const handleStart = useCallback<HandleStart>(
    (data) => {
      playersManager.addPlayer.call(undefined, { icon: data.player1Icon, name: data.player1Name });
      playersManager.addPlayer.call(undefined, { icon: data.player2Icon, name: data.player2Name });
      gameManager.setGameAsStarted.call(undefined);
    },
    [playersManager.addPlayer, gameManager.setGameAsStarted],
  );

  const handleRestart = useCallback(() => {
    boardManager.resetBoard.call(undefined);
    gameManager.resetGame.call(undefined);
  }, [boardManager.resetBoard, gameManager.resetGame]);

  /**
   * @todo This can probably be simplified with computed/derived state and without `useEffect`.
   * Just need to think through what genuinely needs to be reactive/state.
   *
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
      const winner = playersManager.players.find((player) => player.icon === result.iconOfWinner)!;

      gameManager.setGameAsFinished.call(undefined);
      gameManager.setGameWinner.call(undefined, winner);
      boardManager.setSquaresAsWinning.call(undefined, result.winningCombinations);
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
}
