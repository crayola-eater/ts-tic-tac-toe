import { useState, useCallback } from "react";
import { PlayersManager, UsePlayersManager } from "../types/usePlayersManager";

const usePlayersManager: UsePlayersManager = () => {
  const [players, setPlayers] = useState<PlayersManager["players"]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const addPlayer = useCallback<PlayersManager["addPlayer"]>(
    (newPlayer) => {
      setPlayers((prev) => [...prev, newPlayer]);
    },
    [setPlayers]
  );

  const setNextPlayer = useCallback<PlayersManager["setNextPlayer"]>(() => {
    if (0 === players.length) {
      return;
    }
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
  }, [setCurrentPlayerIndex, players]);

  return {
    players,
    currentPlayer: players[currentPlayerIndex],
    currentPlayerIndex,
    addPlayer,
    setNextPlayer,
  };
};

export default usePlayersManager;
