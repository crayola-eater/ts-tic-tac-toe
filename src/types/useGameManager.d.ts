import { Player } from "./usePlayersManager";

export interface GameManager {
  gameHasStarted: boolean;
  gameHasFinished: boolean;
  winner: Player | null;
  setGameAsStarted: () => void;
  setGameAsFinished: () => void;
  setGameWinner: (winner: Player) => void;
  resetGame: () => void;
}

export type UseGameManager = () => GameManager;
