import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BoardSquare from ".";
import { BoardSquareProps } from "../../types/BoardSquare";

describe("BoardSquare component", () => {
  const testProps: BoardSquareProps = {
    handleClick: jest.fn(),
    gameHasFinished: true,
    square: {
      isOccupied: true,
      isWinning: true,
      occupiedBy: "🤡",
      position: 0,
    },
  };

  it("should display who picked the square", () => {
    const { getByText } = render(<BoardSquare {...testProps} />);
    expect(getByText(testProps.square.occupiedBy!)).toBeInTheDocument();
  });

  it("should display nothing when the square is unoccupied", () => {
    const { queryByText } = render(
      <BoardSquare
        {...{ ...testProps, square: { ...testProps.square, occupiedBy: null } }}
      />
    );
    expect(queryByText(/.+/i)).toBeNull();
  });

  it("should have hover class when game is not finished", () => {
    const { container } = render(
      <BoardSquare {...{ ...testProps, gameHasFinished: false }} />
    );
    const button = container.querySelector("button")!;
    expect(button).toHaveClass("hover:bg-gray-200");
  });

  it("should not have hover class when game is finished", () => {
    const { container } = render(
      <BoardSquare {...{ ...testProps, gameHasFinished: true }} />
    );
    const button = container.querySelector("button")!;
    expect(button).not.toHaveClass("hover:bg-gray-200");
  });

  it("should be gray when the square is occupied", () => {
    const { container } = render(<BoardSquare {...testProps} />);
    const button = container.querySelector("button")!;
    expect(button).toHaveClass("bg-gray-200");
  });

  it("should not be gray if unoccupied", () => {
    const { container } = render(
      <BoardSquare
        {...{
          ...testProps,
          square: { ...testProps.square, isOccupied: false, occupiedBy: null },
        }}
      />
    );
    const button = container.querySelector("button")!;
    expect(button).not.toHaveClass("bg-gray-200");
  });

  it("should be golden if square is part of winning sequence", () => {
    const { container } = render(<BoardSquare {...testProps} />);
    const button = container.querySelector("button")!;
    expect(button).toHaveClass("bg-yellow-500");
  });

  it("should not be golden if square is not part of winning sequence", () => {
    const { container } = render(
      <BoardSquare
        {...{
          ...testProps,
          gameHasFinished: false,
          square: { ...testProps.square, isWinning: false },
        }}
      />
    );
    const button = container.querySelector("button")!;
    expect(button).not.toHaveClass("bg-yellow-500");
  });

  it("should be grayed out if game has ended and square is not part of winning sequence", () => {
    const { container } = render(
      <BoardSquare
        {...{
          ...testProps,
          square: { ...testProps.square, isWinning: false },
        }}
      />
    );
    const button = container.querySelector("button")!;
    expect(button).toHaveClass("bg-gray-200 opacity-40");
  });

  it("should be not grayed out if game has not ended", () => {
    const { container } = render(
      <BoardSquare
        {...{
          ...testProps,
          gameHasFinished: false,
          square: { ...testProps.square, isWinning: false },
        }}
      />
    );
    const button = container.querySelector("button")!;
    expect(button).not.toHaveClass("bg-gray-200 opacity-40");
  });

  it("should be not grayed out if square is part of winning sequence", () => {
    const { container } = render(
      <BoardSquare
        {...{
          ...testProps,
          gameHasFinished: true,
          square: { ...testProps.square, isWinning: true },
        }}
      />
    );
    const button = container.querySelector("button")!;
    expect(button).not.toHaveClass("bg-gray-200 opacity-40");
  });

  it("should be animated when square is part of winning sequence", () => {
    const { container } = render(
      <BoardSquare
        {...{
          ...testProps,
          square: { ...testProps.square, isWinning: true },
        }}
      />
    );
    const span = container.querySelector("span")!;
    expect(span).toHaveClass("animate-bounce");
  });

  it("should be not animated when square is not part of winning sequence", () => {
    const { container } = render(
      <BoardSquare
        {...{
          ...testProps,
          square: { ...testProps.square, isWinning: false },
        }}
      />
    );
    const span = container.querySelector("span")!;
    expect(span).not.toHaveClass("animate-bounce");
  });

  it("should invoke handleClick when game has not yet finished", () => {
    const { container } = render(
      <BoardSquare
        {...{
          ...testProps,
          gameHasFinished: false,
        }}
      />
    );
    const button = container.querySelector("button")!;
    fireEvent.click(button);
    expect(testProps.handleClick).toHaveBeenCalledTimes(1);
  });
});
