import { TicTacToe } from "./useTicTacToe";

export type BoardProps = {
  board: TicTacToe["boardManager"]["board"];
  handleMove: TicTacToe["handlers"]["handleMove"];
  gameHasFinished: TicTacToe["gameManager"]["gameHasFinished"];
  currentPlayer: TicTacToe["playersManager"]["currentPlayer"];
};
