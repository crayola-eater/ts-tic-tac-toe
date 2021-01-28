import { BoardSquare } from "./useBoardManager";

export interface BoardSquareProps {
  square: BoardSquare;
  handleClick: () => void;
  gameHasFinished: boolean;
}
