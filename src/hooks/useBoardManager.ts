import { useCallback, useState } from "react";
import { BoardManager, UseBoardManager } from "../types/useBoardManager";

const initialBoard: BoardManager["board"] = Array.from(
  { length: 9 },
  (_, i) => {
    return {
      position: i,
      isOccupied: false,
      occupiedBy: null,
      isWinning: false,
    };
  }
);

const useBoardManager: UseBoardManager = () => {
  const [board, setBoard] = useState<BoardManager["board"]>(initialBoard);

  const setSquareAsOccupied = useCallback<BoardManager["setSquareAsOccupied"]>(
    (index, player) => {
      setBoard((prev) => {
        return [
          ...prev.slice(0, index),
          {
            ...prev[index],
            occupiedBy: player.icon,
            isOccupied: true,
          },
          ...prev.slice(index + 1),
        ];
      });
    },
    []
  );

  const setSquaresAsWinning = useCallback<BoardManager["setSquaresAsWinning"]>(
    (indexes) => {
      const indexesToSet = new Set(indexes.flat());
      setBoard((prev) => {
        return prev.map((square, i) => {
          if (indexesToSet.has(i)) {
            return {
              ...square,
              isWinning: true,
            };
          }

          return square;
        });
      });
    },
    []
  );

  return {
    board,
    setSquareAsOccupied,
    setSquaresAsWinning,
  };
};

export default useBoardManager;
