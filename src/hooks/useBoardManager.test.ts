import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { Player } from '../hooks/usePlayersManager';
import useBoardManager from './useBoardManager';

describe('useBoardManager hook', () => {
  const player: Player = {
    icon: '🧟',
    index: 0,
    name: 'Arthur',
    score: 14,
  };

  it('should have a valid initial state', () => {
    const rendered = renderHook(() => useBoardManager());

    expect(rendered.result.current.board).to.be.an('array').that.is.not.empty;

    for (const [i, square] of rendered.result.current.board.entries()) {
      expect(square).to.deep.equal({
        isOccupied: false,
        isWinning: false,
        occupiedBy: null,
        position: i,
      });
    }
  });

  it('should set a square as occupied', () => {
    const rendered = renderHook(() => useBoardManager());
    const squareIndex = 0;

    act(() => {
      rendered.result.current.setSquareAsOccupied(squareIndex, player);
    });

    const board = rendered.result.current.board;

    expect(board).to.be.an('array').that.is.not.empty;

    expect(board[squareIndex]).to.deep.equal({
      isOccupied: true,
      isWinning: false,
      occupiedBy: player.icon,
      position: squareIndex,
    });

    for (const [i, square] of rendered.result.current.board.entries()) {
      if (i == squareIndex) {
        continue;
      }

      expect(square).to.deep.equal({
        isOccupied: false,
        isWinning: false,
        occupiedBy: null,
        position: i,
      });
    }
  });

  it('should set squares as winning', () => {
    const rendered = renderHook(() => useBoardManager());
    const squareIndex = 1;

    act(() => {
      rendered.result.current.setSquaresAsWinning([[squareIndex]]);
    });

    const board = rendered.result.current.board;

    expect(board).to.be.an('array').that.is.not.empty;

    expect(board[squareIndex]).to.deep.equal({
      isOccupied: false,
      isWinning: true,
      occupiedBy: null,
      position: squareIndex,
    });

    for (const [i, square] of rendered.result.current.board.entries()) {
      if (i == squareIndex) {
        continue;
      }

      expect(square).to.deep.equal({
        isOccupied: false,
        isWinning: false,
        occupiedBy: null,
        position: i,
      });
    }
  });

  it('should reset all squares to their initial state', () => {
    const rendered = renderHook(() => useBoardManager());
    const squareIndexes = [1, 2, 5, 6];

    act(() => {
      rendered.result.current.setSquaresAsWinning([squareIndexes]);

      squareIndexes.forEach((i) => {
        rendered.result.current.setSquareAsOccupied(i, player);
      });
    });

    expect(rendered.result.current.board).to.be.an('array').that.is.not.empty;

    for (const i of squareIndexes) {
      const square = rendered.result.current.board[i];
      expect(square).to.deep.equal({
        isOccupied: true,
        isWinning: true,
        occupiedBy: player.icon,
        position: i,
      });
    }

    act(() => {
      rendered.result.current.resetBoard();
    });

    expect(rendered.result.current.board).to.be.an('array').that.is.not.empty;

    for (const [i, square] of rendered.result.current.board.entries()) {
      expect(square).to.deep.equal({
        isOccupied: false,
        isWinning: false,
        occupiedBy: null,
        position: i,
      });
    }
  });
});
