import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { StartMenuFormData } from '../components/StartMenu/StartMenu';
import type { Player } from './usePlayersManager';
import useTicTacToe from './useTicTacToe';

describe('useTicTacToe hook', () => {
  const testProps: StartMenuFormData = {
    player1Icon: '👽',
    player1Name: 'Agatha',
    player2Icon: '🧛',
    player2Name: 'Charles',
  };

  const firstPlayer = {
    icon: testProps.player1Icon,
    index: 0,
    name: testProps.player1Name,
    score: 0,
  };

  const secondPlayer = {
    icon: testProps.player2Icon,
    index: 0,
    name: testProps.player2Name,
    score: 0,
  };

  it('should start the game and add players correctly', () => {
    const rendered = renderHook(() => useTicTacToe());

    expect(rendered.result.current.gameManager.gameHasStarted).toBe(false);
    expect(rendered.result.current.playersManager.players).to.deep.equal([]);

    act(() => {
      rendered.result.current.handlers.handleStart(testProps);
    });

    expect(rendered.result.current.gameManager.gameHasStarted).toBe(true);
    expect(rendered.result.current.playersManager.players).to.deep.equal([
      {
        icon: testProps.player1Icon,
        name: testProps.player1Name,
        index: 0,
        score: 0,
      },
      {
        icon: testProps.player2Icon,
        name: testProps.player2Name,
        index: 1,
        score: 0,
      },
    ] satisfies Player[]);
  });

  it('should handle moves correctly', () => {
    const rendered = renderHook(() => useTicTacToe());

    expect(rendered.result.current.boardManager.board).to.be.an('array').that.is.not.empty;

    for (const [i, square] of rendered.result.current.boardManager.board.entries()) {
      expect(square).to.deep.include({
        isOccupied: false,
        isWinning: false,
        occupiedBy: null,
        position: i,
      });
    }

    act(() => {
      rendered.result.current.handlers.handleStart(testProps);
    });

    const firstSquareIndex = 0;
    const secondSquareIndex = 1;

    act(() => {
      rendered.result.current.handlers.handleMove(firstSquareIndex, firstPlayer);
    });

    expect(rendered.result.current.boardManager.board[firstSquareIndex]).to.deep.equal({
      isOccupied: true,
      isWinning: false,
      occupiedBy: firstPlayer.icon,
      position: firstSquareIndex,
    });

    act(() => {
      rendered.result.current.handlers.handleMove(firstSquareIndex, secondPlayer);
    });

    expect(rendered.result.current.boardManager.board[firstSquareIndex]).to.deep.equal({
      isOccupied: true,
      isWinning: false,
      occupiedBy: firstPlayer.icon,
      position: firstSquareIndex,
    });

    act(() => {
      rendered.result.current.gameManager.setGameAsFinished();
    });

    expect(rendered.result.current.gameManager.gameHasFinished).toBe(true);

    act(() => {
      rendered.result.current.handlers.handleMove(secondSquareIndex, secondPlayer);
    });

    expect(rendered.result.current.boardManager.board[secondSquareIndex]).to.deep.include({
      isOccupied: false,
      isWinning: false,
      occupiedBy: null,
      position: secondSquareIndex,
    });
  });

  it('should restart the game correctly', () => {
    const rendered = renderHook(() => useTicTacToe());

    act(() => {
      rendered.result.current.handlers.handleStart(testProps);
    });

    const firstSquareIndex = 5;
    const secondSquareIndex = 2;

    act(() => {
      rendered.result.current.handlers.handleMove(firstSquareIndex, firstPlayer);
      rendered.result.current.handlers.handleMove(secondSquareIndex, secondPlayer);
    });

    expect(rendered.result.current.boardManager.board[firstSquareIndex]).to.deep.equal({
      isOccupied: true,
      isWinning: false,
      occupiedBy: firstPlayer.icon,
      position: firstSquareIndex,
    });

    expect(rendered.result.current.boardManager.board[secondSquareIndex]).to.deep.equal({
      isOccupied: true,
      isWinning: false,
      occupiedBy: secondPlayer.icon,
      position: secondSquareIndex,
    });

    act(() => {
      rendered.result.current.handlers.handleRestart();
    });

    expect(rendered.result.current.boardManager.board).to.be.an('array').that.is.not.empty;

    for (const [i, square] of rendered.result.current.boardManager.board.entries()) {
      expect(square).to.deep.include({
        isOccupied: false,
        isWinning: false,
        occupiedBy: null,
        position: i,
      });
    }

    expect(rendered.result.current.gameManager).to.deep.include({
      gameHasStarted: true,
      gameHasFinished: false,
      winner: null,
    });
  });

  it('should calculate the winner correctly', () => {
    const rendered = renderHook(() => useTicTacToe());

    act(() => {
      rendered.result.current.handlers.handleStart(testProps);
    });

    // prettier-ignore
    const movesToMake = [
      0, 0, 0,
      1, 0, 1,
      1, 1, 0,
    ];

    act(() => {
      for (let i = 0; i < movesToMake.length; ++i) {
        const player = movesToMake[i] === 0 ? firstPlayer : secondPlayer;
        rendered.result.current.handlers.handleMove(i, player);
      }
    });

    expect(rendered.result.current.gameManager).to.deep.include({
      winner: firstPlayer,
      gameHasFinished: true,
    });
  });
});
