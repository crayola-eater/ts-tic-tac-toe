import { useState, useCallback } from "react";

import { GameManager, UseGameManager } from "../types/useGameManager";

const useGameManager: UseGameManager = () => {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [winner, setWinner] = useState<GameManager["winner"]>(null);

  const setGameAsStarted = useCallback<GameManager["setGameAsStarted"]>(
    () => setStarted(true),
    [setStarted]
  );

  const setGameAsFinished = useCallback<GameManager["setGameAsFinished"]>(
    () => setFinished(true),
    [setFinished]
  );

  const setGameWinner = useCallback<GameManager["setGameWinner"]>(
    (winner) => setWinner(winner),
    [setWinner]
  );

  return {
    gameHasStarted: started,
    gameHasFinished: finished,
    winner,
    setGameAsStarted,
    setGameAsFinished,
    setGameWinner,
  };
};

export default useGameManager;
