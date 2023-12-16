export type BoardSquare = {
  position: number;
  isOccupied: boolean;
  occupiedBy: string | null;
  isWinning: boolean;
};

export type Player = {
  icon: string;
  name: string;
  score: number;
};

export type TicTacToe = {
  board: BoardSquare[];
  players: null | [Player, Player];
  currentPlayer: null | Player;
  winner: null | Player;
  gameStatus: GameStatus;
  handlers: {
    handleMove: (move: Move) => void;
    handleStart: (options: PlayerCreationOptions) => void;
    handleRestart: () => void;
  };
};

export type HandleMove = TicTacToe['handlers']['handleMove'];
export type HandleStart = TicTacToe['handlers']['handleStart'];
export type handleRestart = TicTacToe['handlers']['handleRestart'];

export type Move = {
  playerIcon: string;
  squarePosition: number;
};

export type NullablePlayers = null | [Player, Player];
export type GameStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'FINISHED';
export type WinningCombinations = [number, number, number][];

export type PlayerCreationOptions = [
  {
    icon: string;
    name: string;
  },
  {
    icon: string;
    name: string;
  },
];
