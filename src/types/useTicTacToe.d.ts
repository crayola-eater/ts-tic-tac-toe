import { StartMenuFormData } from "./StartMenu";
import { BoardManager } from "./useBoardManager";
import { GameManager } from "./useGameManager";
import { Player, PlayersManager } from "./usePlayersManager";

export interface TicTacToe {
  boardManager: BoardManager;
  playersManager: PlayersManager;
  gameManager: GameManager;
  handlers: {
    handleMove: (index: number, player: Player) => void;
    handleStart: (data: StartMenuFormData) => void;
    handleRestart: () => void;
  };
}

export type UseTicTacToe = () => TicTacToe;
