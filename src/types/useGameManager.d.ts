import { Player } from "./usePlayersManager";

export interface GameManager {
  gameHasStarted: boolean;
  gameHasFinished: boolean;
  winner: Player | null;
  currentMoveIndex: number;
  setGameAsStarted: () => void;
  setGameAsFinished: () => void;
  incrementCurrentMoveIndex: () => void;
  setGameWinner: (winner: Player) => void;
  resetGame: () => void;
}

export type UseGameManager = () => GameManager;
