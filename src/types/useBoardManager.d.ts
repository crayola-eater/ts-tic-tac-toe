import { Player } from "./usePlayersManager";

export interface BoardSquare {
  position: number;
  isOccupied: boolean;
  occupiedBy: string | null;
  isWinning: boolean;
}

export interface BoardManager {
  board: BoardSquare[];
  setSquareAsOccupied: (index: number, player: Player) => void;
  setSquaresAsWinning: (indexes: number[][]) => void;
}

export type UseBoardManager = () => BoardManager;
