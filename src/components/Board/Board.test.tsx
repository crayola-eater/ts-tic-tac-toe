import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import type { BoardProps } from './Board';
import Board from './Board';

describe('Board component', () => {
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
      icon: '👾',
      name: 'Luigi',
      index: 0,
      score: 12,
    },
    gameHasFinished: true,
    handleMove: vi.fn(),
  };

  it('should display one button for each square', async () => {
    render(<Board {...testProps} />);
    const squares = await screen.findAllByRole('button');
    expect(squares).to.have.length(testProps.board.length);
  });

  it("should not display 9 buttons if there aren't 9 squares", async () => {
    const board = testProps.board.slice(0, 3);
    render(<Board {...{ ...testProps, board }} />);
    const squares = await screen.findAllByRole('button');
    expect(squares).toHaveLength(board.length);
  });
});
