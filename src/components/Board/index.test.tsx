import React from "react";
import { render } from "@testing-library/react";
import { BoardProps } from "../../types/Board";
import Board from ".";

describe("Board component", () => {
  const testProps: BoardProps = {
    board: Array.from({ length: 9 }, (_, i) => {
      return {
        isOccupied: false,
        isWinning: false,
        occupiedBy: null,
        position: i,
      };
    }),
    currentPlayer: {
      icon: "👾",
      name: "Luigi",
      index: 0,
      score: 12,
    },
    gameHasFinished: true,
    handleMove: jest.fn(),
  };

  it("should display one button for each square", () => {
    const { container } = render(<Board {...testProps} />);
    const squares = container.querySelectorAll("button");
    expect(squares).toHaveLength(testProps.board.length);
  });

  it("should not display 9 buttons if there aren't 9 squares", () => {
    const board = testProps.board.slice(0, 3);
    const { container } = render(<Board {...{ ...testProps, board }} />);
    const squares = container.querySelectorAll("button");
    expect(squares).toHaveLength(board.length);
  });
});
