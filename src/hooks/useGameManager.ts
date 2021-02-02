import { useState, useCallback } from "react";

import { GameManager, UseGameManager } from "../types/useGameManager";

const useGameManager: UseGameManager = () => {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [winner, setWinner] = useState<GameManager["winner"]>(null);

  const setGameAsStarted = useCallback<GameManager["setGameAsStarted"]>(
    () => setStarted(true),
    [setStarted]
  );

  const setGameAsFinished = useCallback<GameManager["setGameAsFinished"]>(
    () => setFinished(true),
    [setFinished]
  );

  const incrementCurrentMoveIndex = useCallback<
    GameManager["incrementCurrentMoveIndex"]
  >(() => {
    setCurrentMoveIndex((prev) => prev + 1);
  }, [setCurrentMoveIndex]);

  const setGameWinner = useCallback<GameManager["setGameWinner"]>(
    (winner) => setWinner(winner),
    [setWinner]
  );

  const resetGame = useCallback<GameManager["resetGame"]>(() => {
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
};

export default useGameManager;
