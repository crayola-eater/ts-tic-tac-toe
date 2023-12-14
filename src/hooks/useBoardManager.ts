import { useCallback, useState } from 'react';
import type { Player } from './usePlayersManager';

export type BoardSquare = {
  position: number;
  isOccupied: boolean;
  occupiedBy: string | null;
  isWinning: boolean;
};
export type BoardManager = {
  board: BoardSquare[];
  setSquareAsOccupied: (index: number, player: Player) => void;
  setSquaresAsWinning: (indexes: number[][]) => void;
  resetBoard: () => void;
};
export type Board = BoardManager['board'];
export type SetSquaresAsOccupied = BoardManager['setSquareAsOccupied'];
export type SetSquaresAsWinning = BoardManager['setSquaresAsWinning'];
export type ResetBoard = BoardManager['resetBoard'];

const initialBoard: Board = Array.from({ length: 9 }, (_, i) => {
  const square: BoardSquare = {
    position: i,
    isOccupied: false,
    occupiedBy: null,
    isWinning: false,
  };
  return square;
});

export default function useBoardManager(): BoardManager {
  const [board, setBoard] = useState(initialBoard);

  const setSquareAsOccupied = useCallback<SetSquaresAsOccupied>((index, player) => {
    setBoard((prev) => {
      const updatedSquare: BoardSquare = {
        ...prev[index],
        occupiedBy: player.icon,
        isOccupied: true,
      };
      return prev.with(index, updatedSquare);
    });
  }, []);

  const setSquaresAsWinning = useCallback<SetSquaresAsWinning>((indexes) => {
    const indexesToSet = new Set(indexes.flat());
    setBoard((prev) => {
      return prev.map((square, i) => {
        return indexesToSet.has(i)
          ? {
              ...square,
              isWinning: true,
            }
          : square;
      });
    });
  }, []);

  const resetBoard = useCallback<ResetBoard>(() => {
    setBoard(initialBoard);
  }, []);

  return {
    board,
    setSquareAsOccupied,
    setSquaresAsWinning,
    resetBoard,
  };
}
