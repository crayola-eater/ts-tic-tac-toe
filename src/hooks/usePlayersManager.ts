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

  const incrementPlayerScore = useCallback<
    PlayersManager["incrementPlayerScore"]
  >(
    (playerIndex, increment = 1) => {
      setPlayers((prev) => {
        return [
          ...prev.slice(0, playerIndex),
          {
            ...prev[playerIndex],
            score: prev[playerIndex].score + increment,
          },
          ...prev.slice(playerIndex + 1),
        ];
      });
    },
    [setPlayers]
  );

  return {
    players,
    currentPlayer: players[currentPlayerIndex],
    currentPlayerIndex,
    addPlayer,
    setNextPlayer,
    incrementPlayerScore,
  };
};

export default usePlayersManager;
