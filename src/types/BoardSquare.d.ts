import { BoardSquare } from "./useBoardManager";
import { TicTacToe } from "./useTicTacToe";

export interface BoardSquareProps {
  square: BoardSquare;
  handleClick: () => void;
  gameHasFinished: TicTacToe["gameManager"]["gameHasFinished"];
}
