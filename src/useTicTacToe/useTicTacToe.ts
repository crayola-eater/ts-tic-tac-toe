import { useCallback, useEffect, useState } from 'react';
import {
  calculateGameStatus,
  createBoardWithWinningCombinations,
  tryCalculateWinner,
} from './helpers';
import type { TicTacToe, Move, NullablePlayers, PlayerCreationOptions } from './types';

export default function useTicTacToe(): TicTacToe {
  // Raw state
  const [moves, setMoves] = useState<Move[]>([]);
  const [players, setPlayers] = useState<NullablePlayers>(null);

  // Computed values
  const [board, winningCombinations] = createBoardWithWinningCombinations(moves);
  const currentPlayer =
    players && moves.length < board.length ? players[moves.length % players.length] : null;
  const winner = players && tryCalculateWinner(board, winningCombinations, players);
  const gameStatus = calculateGameStatus(players, winner, board);

  const handleStart = useCallback(([player1, player2]: PlayerCreationOptions) => {
    setPlayers([
      { icon: player1.icon, name: player1.name, score: 0 },
      { icon: player2.icon, name: player2.name, score: 0 },
    ]);
  }, []);

  const handleMove = useCallback((move: Move): void => {
    setMoves((prev) => {
      const alreadyOccupied = prev.some((other) => other.squarePosition === move.squarePosition);
      return alreadyOccupied ? prev : prev.concat(move);
    });
  }, []);

  const handleRestart = useCallback(() => {
    setPlayers((prev) => {
      if (null === prev || null === winner) {
        return prev;
      }
      const [player1, player2] = prev.map((player) =>
        player.icon === winner.icon ? { ...player, score: player.score + 1 } : player,
      );
      return [player1, player2];
    });
    setMoves([]);
  }, [winner]);

  /**
   * Auto-restart the game when it has finished.
   */
  useEffect(() => {
    if (gameStatus === 'FINISHED') {
      const timeoutId = setTimeout(handleRestart, 2_000);
      return () => clearTimeout(timeoutId);
    }
  }, [handleRestart, gameStatus]);

  return {
    gameStatus,
    winner,
    board,
    players,
    currentPlayer,
    handlers: {
      handleMove,
      handleStart,
      handleRestart,
    },
  };
}
