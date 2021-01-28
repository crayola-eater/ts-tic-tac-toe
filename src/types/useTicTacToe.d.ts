import { BoardManager } from "./useBoardManager";
import { GameManager } from "./useGameManager";
import { Player, PlayersManager } from "./usePlayersManager";

export interface TicTacToe {
  boardManager: BoardManager;
  playersManager: PlayersManager;
  gameManager: GameManager;
  handlers: {
    handleMove: (index: number, player: Player) => void;
  };
}

export type UseTicTacToe = () => TicTacToe;
