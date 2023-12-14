import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import BoardSquare, { type BoardSquareProps } from './BoardSquare';

describe('BoardSquare component', () => {
  const testProps: BoardSquareProps = {
    handleClick: vi.fn(),
    gameHasFinished: true,
    square: {
      isOccupied: true,
      isWinning: true,
      occupiedBy: '🤡',
      position: 0,
    },
  };

  it('should display who picked the square', async () => {
    render(<BoardSquare {...testProps} />);
    const square = await screen.findByRole('button', { name: testProps.square.occupiedBy! });
    expect(square).toBeInTheDocument();
  });

  it('should display nothing when the square is unoccupied', async () => {
    const updatedSquare: BoardSquareProps['square'] = {
      isOccupied: false,
      isWinning: false,
      occupiedBy: null,
      position: 0,
    };
    const updatedProps: BoardSquareProps = { ...testProps, square: updatedSquare };
    render(<BoardSquare {...updatedProps} />);
    const square = await screen.findByRole('button');
    expect(square).toHaveTextContent('');
  });

  it('should have hover class when game is not finished', async () => {
    render(<BoardSquare {...{ ...testProps, gameHasFinished: false }} />);
    const button = await screen.findByRole('button')!;
    expect(button).toHaveClass('hover:bg-gray-200');
  });

  it('should not have hover class when game is finished', async () => {
    render(<BoardSquare {...{ ...testProps, gameHasFinished: true }} />);
    const button = await screen.findByRole('button', { name: testProps.square.occupiedBy! });
    expect(button).not.toHaveClass('hover:bg-gray-200');
  });

  it('should be gray when the square is occupied', async () => {
    render(<BoardSquare {...testProps} />);
    const button = await screen.findByRole('button', { name: testProps.square.occupiedBy! });
    expect(button).toHaveClass('bg-gray-200');
  });

  it('should not be gray if unoccupied', async () => {
    const updatedSquare: BoardSquareProps['square'] = {
      isOccupied: false,
      occupiedBy: null,
      isWinning: false,
      position: 0,
    };
    const updatedProps: BoardSquareProps = {
      ...testProps,
      square: updatedSquare,
      gameHasFinished: false,
    };
    render(<BoardSquare {...updatedProps} />);
    const button = await screen.findByRole('button');
    expect(button).not.toHaveClass('bg-gray-200');
  });

  it('should be golden if square is part of winning sequence', async () => {
    render(<BoardSquare {...testProps} />);
    const button = await screen.findByRole('button', { name: testProps.square.occupiedBy! });
    expect(button).toHaveClass('bg-yellow-500');
  });

  it('should be grayed (and not golden) if square is not part of winning sequence', async () => {
    const updatedSquare: BoardSquareProps['square'] = {
      ...testProps.square,
      isWinning: false,
    };
    const updatedProps: BoardSquareProps = {
      ...testProps,
      square: updatedSquare,
      gameHasFinished: false,
    };
    render(<BoardSquare {...updatedProps} />);
    const button = await screen.findByRole('button', { name: updatedProps.square.occupiedBy! });
    expect(button).not.toHaveClass('bg-yellow-500');
  });

  it('should be grayed out if game has ended and square is not part of winning sequence', async () => {
    const updatedSquare: BoardSquareProps['square'] = {
      ...testProps.square,
      isWinning: false,
    };
    const updatedProps: BoardSquareProps = {
      ...testProps,
      square: updatedSquare,
      gameHasFinished: true,
    };
    render(<BoardSquare {...updatedProps} />);
    const button = await screen.findByRole('button', { name: updatedProps.square.occupiedBy! });
    expect(button).toHaveClass('bg-gray-200 opacity-40');
  });

  it('should be not grayed out if game has not ended', async () => {
    const updatedSquare: BoardSquareProps['square'] = {
      ...testProps.square,
      isWinning: false,
    };
    const updatedProps: BoardSquareProps = {
      ...testProps,
      square: updatedSquare,
      gameHasFinished: false,
    };

    render(<BoardSquare {...updatedProps} />);
    const button = await screen.findByRole('button', { name: updatedProps.square.occupiedBy! });
    expect(button).not.toHaveClass('bg-gray-200 opacity-40');
  });

  it('should be not grayed out if square is part of winning sequence', async () => {
    const updatedSquare: BoardSquareProps['square'] = {
      ...testProps.square,
      isWinning: true,
    };
    const updatedProps: BoardSquareProps = {
      ...testProps,
      square: updatedSquare,
      gameHasFinished: true,
    };

    render(<BoardSquare {...updatedProps} />);
    const button = await screen.findByRole('button', { name: updatedProps.square.occupiedBy! });
    expect(button).not.toHaveClass('bg-gray-200 opacity-40');
  });

  it('should be animated when square is part of winning sequence', async () => {
    const updatedSquare: BoardSquareProps['square'] = {
      ...testProps.square,
      isWinning: true,
    };
    const updatedProps: BoardSquareProps = {
      ...testProps,
      square: updatedSquare,
      gameHasFinished: true,
    };

    render(<BoardSquare {...updatedProps} />);

    const square = await screen.findByRole('button', { name: updatedProps.square.occupiedBy! });
    const span = await within(square).findByText(updatedProps.square.occupiedBy!);
    expect(span).toHaveClass('animate-bounce');
  });

  it('should be not animated when square is not part of winning sequence', async () => {
    const updatedSquare: BoardSquareProps['square'] = {
      ...testProps.square,
      isWinning: false,
    };
    const updatedProps: BoardSquareProps = {
      ...testProps,
      square: updatedSquare,
      gameHasFinished: true,
    };

    render(<BoardSquare {...updatedProps} />);

    const square = await screen.findByRole('button', { name: updatedProps.square.occupiedBy! });
    const span = await within(square).findByText(updatedProps.square.occupiedBy!);
    expect(span).not.toHaveClass('animate-bounce');
  });

  it('should invoke handleClick when game has not yet finished', async () => {
    const user = userEvent.setup();
    const updatedProps = { ...testProps, gameHasFinished: false };
    render(<BoardSquare {...updatedProps} />);
    const button = await screen.findByRole('button', { name: updatedProps.square.occupiedBy! });

    expect(testProps.handleClick).toHaveBeenCalledTimes(0);

    await user.click(button);

    expect(testProps.handleClick).toHaveBeenCalledTimes(1);
  });
});
