export interface Player {
  index: number;
  icon: string;
  name: string;
  score: number;
}

export interface PlayersManager {
  players: Player[];
  currentPlayerIndex: number;
  currentPlayer: Player;
  addPlayer: (player: Player) => void;
  setNextPlayer: () => void;
  incrementPlayerScore: (playerIndex: number, increment = 1) => void;
}

export type UsePlayersManager = () => PlayersManager;
