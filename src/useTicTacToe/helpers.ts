import type {
  BoardSquare,
  Move,
  Player,
  WinningCombinations,
  NullablePlayers,
  GameStatus,
} from './types';

function createBoard(): BoardSquare[] {
  const board: BoardSquare[] = Array.from({ length: 9 }, (_, i) => {
    return {
      isOccupied: false,
      isWinning: false,
      occupiedBy: null,
      position: i,
    } satisfies BoardSquare;
  });
  return board;
}

export function createBoardWithWinningCombinations(
  moves: Move[],
): [BoardSquare[], [number, number, number][]] {
  const board = createBoard();

  for (const move of moves) {
    const squareToUpdate = board[move.squarePosition];
    squareToUpdate.isOccupied = true;
    squareToUpdate.occupiedBy = move.playerIcon;
  }

  const winningCombinations = calculateWinningCombinations(board);

  for (const i of winningCombinations.flat()) {
    board[i].isWinning = true;
  }

  return [board, winningCombinations];
}

function calculateWinningCombinations(board: BoardSquare[]) {
  const combinationsToCheck = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ] satisfies [number, number, number][];

  const winningCombinations = combinationsToCheck.filter(([i, j, k]) => {
    return (
      board[i].isOccupied &&
      board[i].occupiedBy === board[j].occupiedBy &&
      board[i].occupiedBy === board[k].occupiedBy
    );
  });

  return winningCombinations;
}

export function tryCalculateWinner(
  board: BoardSquare[],
  winningCombinations: WinningCombinations,
  [player1, player2]: [Player, Player],
): null | Player {
  if (winningCombinations.length === 0) {
    return null;
  }

  const position = winningCombinations[0][0];
  const winningSquare = board[position];
  const icon = winningSquare.occupiedBy;

  if (icon === player1.icon) {
    return player1;
  } else if (icon === player2.icon) {
    return player2;
  }
  console.warn('Unexpected icon', icon);
  return null;
}

export function calculateGameStatus(
  players: NullablePlayers,
  winner: null | Player,
  board: BoardSquare[],
): GameStatus {
  if (null === players) {
    return 'NOT_STARTED';
  } else if (null !== winner) {
    return 'FINISHED';
  } else if (board.every((square) => square.isOccupied)) {
    return 'FINISHED';
  }
  return 'IN_PROGRESS';
}
