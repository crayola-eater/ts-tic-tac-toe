export interface Player {
  icon: string;
  name: string;
}

export interface PlayersManager {
  players: Player[];
  currentPlayerIndex: number;
  currentPlayer: Player;
  addPlayer: (player: Player) => void;
  setNextPlayer: () => void;
}

export type UsePlayersManager = () => PlayersManager;
