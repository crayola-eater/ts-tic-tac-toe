import { TicTacToe } from "./useTicTacToe";

export interface StatusProps {
  gameHasFinished: TicTacToe["gameManager"]["gameHasFinished"];
  winner: TicTacToe["gameManager"]["winner"];
  currentPlayer: TicTacToe["playersManager"]["currentPlayer"];
}
