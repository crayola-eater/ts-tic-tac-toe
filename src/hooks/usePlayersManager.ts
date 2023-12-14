import { useState, useCallback } from 'react';

export type Player = {
  index: number;
  icon: string;
  name: string;
  score: number;
};

export type PlayersManager = {
  players: Player[];
  currentPlayerIndex: number;
  currentPlayer: Player;
  addPlayer: (player: Omit<Player, 'index' | 'score'>) => void;
  setNextPlayer: () => void;
  incrementPlayerScore: (playerIndex: number, increment?: number) => void;
};

export type AddPlayer = PlayersManager['addPlayer'];
export type SetNextPlayer = PlayersManager['setNextPlayer'];
export type IncrementPlayerScore = PlayersManager['incrementPlayerScore'];

export default function usePlayersManager(): PlayersManager {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const addPlayer = useCallback<AddPlayer>((options) => {
    setPlayers((prev) => {
      const newPlayer: Player = {
        ...options,
        index: prev.length,
        score: 0,
      };
      return [...prev, newPlayer];
    });
  }, []);

  const setNextPlayer = useCallback<SetNextPlayer>(() => {
    if (0 === players.length) {
      return;
    }
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
  }, [players]);

  const incrementPlayerScore = useCallback<IncrementPlayerScore>((playerIndex, increment = 1) => {
    setPlayers((prev) => {
      const updated = {
        ...prev[playerIndex],
        score: prev[playerIndex].score + increment,
      };

      return prev.with(playerIndex, updated);
    });
  }, []);

  return {
    players,
    currentPlayer: players[currentPlayerIndex],
    currentPlayerIndex,
    addPlayer,
    setNextPlayer,
    incrementPlayerScore,
  };
}
