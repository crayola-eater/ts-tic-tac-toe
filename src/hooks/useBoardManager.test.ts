import { renderHook, act } from "@testing-library/react-hooks";
import { Player } from "../types/usePlayersManager";
import useBoardManager from "./useBoardManager";

describe("useBoardManager hook", () => {
  const player: Player = {
    icon: "🧟",
    index: 0,
    name: "Arthur",
    score: 14,
  };

  it("should have expose a valid interface", () => {
    const rendered = renderHook(() => useBoardManager());
    expect(rendered.result.current).toEqual(
      expect.objectContaining({
        board: expect.arrayContaining([
          expect.objectContaining({
            position: expect.any(Number),
            isOccupied: false,
            occupiedBy: null,
            isWinning: false,
          }),
        ]),
        setSquareAsOccupied: expect.any(Function),
        setSquaresAsWinning: expect.any(Function),
        resetBoard: expect.any(Function),
      })
    );
  });

  it("should have a valid initial state", () => {
    const rendered = renderHook(() => useBoardManager());
    expect(
      rendered.result.current.board.every((square, i) => {
        return (
          !square.isOccupied &&
          !square.isWinning &&
          null === square.occupiedBy &&
          square.position === i
        );
      })
    ).toBe(true);
  });

  it("should set a square as occupied", () => {
    const rendered = renderHook(() => useBoardManager());
    const squareIndex = 0;

    act(() => {
      rendered.result.current.setSquareAsOccupied(squareIndex, player);
    });

    expect(
      rendered.result.current.board.every((square, i) => {
        const shouldHaveChanged = i === squareIndex;

        if (shouldHaveChanged) {
          return (
            square.isOccupied &&
            !square.isWinning &&
            player.icon === square.occupiedBy &&
            square.position === i
          );
        }

        return (
          !square.isOccupied &&
          !square.isWinning &&
          null === square.occupiedBy &&
          square.position === i
        );
      })
    ).toBe(true);
  });

  it("should set squares as winning", () => {
    const rendered = renderHook(() => useBoardManager());
    const squareIndex = 1;

    act(() => {
      rendered.result.current.setSquaresAsWinning([[squareIndex]]);
    });

    expect(
      rendered.result.current.board.every((square, i) => {
        const shouldHaveChanged = i === squareIndex;

        if (shouldHaveChanged) {
          return (
            !square.isOccupied &&
            square.isWinning &&
            null === square.occupiedBy &&
            square.position === i
          );
        }

        return (
          !square.isOccupied &&
          !square.isWinning &&
          null === square.occupiedBy &&
          square.position === i
        );
      })
    ).toBe(true);
  });

  it("should reset all squares to their initial state", () => {
    const rendered = renderHook(() => useBoardManager());
    const squareIndexes = [1, 2, 5, 6];

    act(() => {
      rendered.result.current.setSquaresAsWinning([squareIndexes]);

      squareIndexes.forEach((i) => {
        rendered.result.current.setSquareAsOccupied(i, player);
      });
    });

    expect(
      rendered.result.current.board.every((square, i) => {
        const shouldHaveChanged = squareIndexes.includes(i);

        if (shouldHaveChanged) {
          return (
            square.isOccupied &&
            square.isWinning &&
            square.occupiedBy === player.icon &&
            square.position === i
          );
        }

        return (
          !square.isOccupied &&
          !square.isWinning &&
          null === square.occupiedBy &&
          square.position === i
        );
      })
    ).toBe(true);

    act(() => {
      rendered.result.current.resetBoard();
    });

    expect(
      rendered.result.current.board.every((square, i) => {
        return (
          !square.isOccupied &&
          !square.isWinning &&
          null === square.occupiedBy &&
          square.position === i
        );
      })
    ).toBe(true);
  });
});
