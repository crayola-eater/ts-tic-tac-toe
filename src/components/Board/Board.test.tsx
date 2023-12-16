import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import Board from './Board';

describe('Board component', () => {
  it('should display one button for each square', async () => {
    const board = Array.from({ length: 9 }, (_, i) => {
      return {
        isOccupied: false,
        isWinning: false,
        occupiedBy: null,
        position: i,
      };
    });
    render(
      <Board
        status="IN_PROGRESS"
        handleMove={vi.fn()}
        board={board}
        currentPlayer={{
          icon: '👾',
          name: 'Luigi',
          score: 12,
        }}
      />,
    );
    const squares = await screen.findAllByRole('button');
    expect(squares).to.have.length(board.length);

    for (const [i, square] of board.entries()) {
      const squareElement = squares[i];
      expect(squareElement).toHaveTextContent(square.occupiedBy ?? '');
    }
  });
});
