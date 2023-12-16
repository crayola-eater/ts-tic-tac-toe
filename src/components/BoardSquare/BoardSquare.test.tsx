import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import BoardSquare from './BoardSquare';

describe('BoardSquare component', () => {
  it.each([
    '🧟',
    '☠️',
    '⚰️',
    '🎃',
    '👻',
    '👹',
    '🤡',
    '💀',
    '👾',
    '👺',
    '👽',
    '🧙',
    '🧛',
    '👸',
    '🧡',
  ] as const)("should display the occupier's icon (%s) when square is occupied", async (icon) => {
    render(
      <BoardSquare
        handleClick={vi.fn()}
        status="IN_PROGRESS"
        square={{ isOccupied: true, isWinning: false, position: 0, occupiedBy: icon }}
      />,
    );
    const square = await screen.findByRole('button', { name: icon });
    expect(square).toHaveTextContent(icon);
  });

  it.each(['IN_PROGRESS', 'FINISHED'] as const)(
    'should display nothing when the square is unoccupied and game status is %s',
    async (status) => {
      render(
        <BoardSquare
          handleClick={vi.fn()}
          status={status}
          square={{ isOccupied: false, isWinning: false, position: 1, occupiedBy: null }}
        />,
      );
      const square = await screen.findByRole('button');
      expect(square).toHaveTextContent('');
    },
  );

  it('should have hover class when game is not finished', async () => {
    render(
      <BoardSquare
        status="IN_PROGRESS"
        handleClick={vi.fn()}
        square={{ isOccupied: false, isWinning: false, occupiedBy: null, position: 2 }}
      />,
    );
    const button = await screen.findByRole('button')!;
    expect(button).toHaveClass('hover:bg-gray-200');
  });

  it('should not have hover class when game is finished', async () => {
    render(
      <BoardSquare
        status="FINISHED"
        handleClick={vi.fn()}
        square={{ isOccupied: false, isWinning: false, occupiedBy: '💀', position: 3 }}
      />,
    );
    const button = await screen.findByRole('button', { name: '💀' });
    expect(button).not.toHaveClass('hover:bg-gray-200');
  });

  it('should have a gray background when the square is occupied', async () => {
    render(
      <BoardSquare
        status="IN_PROGRESS"
        handleClick={vi.fn()}
        square={{ isOccupied: true, occupiedBy: '👺', isWinning: false, position: 4 }}
      />,
    );
    const button = await screen.findByRole('button', { name: '👺' });
    expect(button).toHaveClass('bg-gray-200');
  });

  it('should have a golden background if square is part of winning sequence', async () => {
    render(
      <BoardSquare
        status="FINISHED"
        handleClick={vi.fn()}
        square={{ isOccupied: true, isWinning: true, occupiedBy: '⚰️', position: 6 }}
      />,
    );
    const button = await screen.findByRole('button', { name: '⚰️' });
    expect(button).toHaveClass('bg-yellow-500');
    expect(button).not.toHaveClass('bg-gray-200 opacity-40');
  });

  it('should be have a gray background (and not golden) when game has finished but square is not part of winning sequence', async () => {
    render(
      <BoardSquare
        status="FINISHED"
        handleClick={vi.fn()}
        square={{ isOccupied: true, isWinning: false, occupiedBy: '👻', position: 7 }}
      />,
    );
    const button = await screen.findByRole('button', { name: '👻' });
    expect(button).toHaveClass('bg-gray-200');
    expect(button).not.toHaveClass('bg-yellow-500');
  });

  it('should be animated when square is part of winning sequence', async () => {
    render(
      <BoardSquare
        handleClick={vi.fn()}
        status="FINISHED"
        square={{ isOccupied: true, occupiedBy: '👽', isWinning: true, position: 8 }}
      />,
    );
    const square = await screen.findByRole('button', { name: '👽' });
    const span = await within(square).findByText('👽');
    expect(span).toHaveClass('animate-bounce');
  });

  it('should invoke handleClick when game is in progress and unoccupied square is clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <BoardSquare
        handleClick={handleClick}
        square={{ isOccupied: false, occupiedBy: null, isWinning: false, position: 0 }}
        status="IN_PROGRESS"
      />,
    );

    const button = await screen.findByRole('button');
    expect(handleClick).toHaveBeenCalledTimes(0);
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not invoke handleClick when game is in progress and occupied square is clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <BoardSquare
        handleClick={handleClick}
        square={{ isOccupied: true, occupiedBy: '🧡', isWinning: false, position: 0 }}
        status="IN_PROGRESS"
      />,
    );

    const button = await screen.findByRole('button');
    expect(handleClick).toHaveBeenCalledTimes(0);
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it('should not invoke handleClick or enable the button when the game is finished', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      <BoardSquare
        handleClick={handleClick}
        status="FINISHED"
        square={{ isOccupied: false, isWinning: false, occupiedBy: '👹', position: 1 }}
      />,
    );

    const button = await screen.findByRole('button', { name: '👹' });
    expect(button).toBeDisabled();
    expect(handleClick).toHaveBeenCalledTimes(0);
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
