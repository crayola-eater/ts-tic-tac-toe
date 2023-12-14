import { useState, useCallback } from 'react';
import type { Player } from './usePlayersManager';

export type GameManager = {
  gameHasStarted: boolean;
  gameHasFinished: boolean;
  winner: Player | null;
  currentMoveIndex: number;
  setGameAsStarted: () => void;
  setGameAsFinished: () => void;
  incrementCurrentMoveIndex: () => void;
  setGameWinner: (winner: Player) => void;
  resetGame: () => void;
};
export type Winner = GameManager['winner'];
export type SetGameAsStarted = GameManager['setGameAsStarted'];
export type SetGameAsFinished = GameManager['setGameAsFinished'];
export type IncrementCurrentMoveIndex = GameManager['incrementCurrentMoveIndex'];
export type SetGameWinner = GameManager['setGameWinner'];
export type ResetGame = GameManager['resetGame'];

export default function useGameManager(): GameManager {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [winner, setWinner] = useState<Winner>(null);

  const setGameAsStarted = useCallback<SetGameAsStarted>(() => setStarted(true), []);
  const setGameAsFinished = useCallback<SetGameAsFinished>(() => setFinished(true), []);

  const incrementCurrentMoveIndex = useCallback<IncrementCurrentMoveIndex>(() => {
    setCurrentMoveIndex((prev) => prev + 1);
  }, []);

  const setGameWinner = useCallback<SetGameWinner>((winner) => setWinner(winner), []);

  const resetGame = useCallback<ResetGame>(() => {
    setStarted(true);
    setFinished(false);
    setWinner(null);
    setCurrentMoveIndex(0);
  }, []);

  return {
    gameHasStarted: started,
    gameHasFinished: finished,
    winner,
    currentMoveIndex,
    setGameAsStarted,
    setGameAsFinished,
    incrementCurrentMoveIndex,
    setGameWinner,
    resetGame,
  };
}
