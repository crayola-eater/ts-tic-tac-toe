import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { Player } from '../hooks/usePlayersManager';
import useGameManager from './useGameManager';

describe('useGameManager hook', () => {
  const player: Player = {
    icon: '🧟',
    index: 0,
    name: 'Arthur',
    score: 14,
  };

  it('should set gameHasStarted property to true', () => {
    const rendered = renderHook(() => useGameManager());
    expect(rendered.result.current.gameHasStarted).toBe(false);

    act(() => rendered.result.current.setGameAsStarted());

    expect(rendered.result.current.gameHasStarted).toBe(true);
  });

  it('should set gameHasFinished property to true', () => {
    const rendered = renderHook(() => useGameManager());
    expect(rendered.result.current.gameHasFinished).toBe(false);

    act(() => rendered.result.current.setGameAsFinished());

    expect(rendered.result.current.gameHasFinished).toBe(true);
  });

  it('should set winner correctly', () => {
    const rendered = renderHook(() => useGameManager());
    expect(rendered.result.current.winner).toBeNull();

    act(() => rendered.result.current.setGameWinner(player));

    expect(rendered.result.current.winner).to.deep.equal(player);
  });

  it('should reset the game correctly', () => {
    const rendered = renderHook(() => useGameManager());
    expect(rendered.result.current).to.deep.include({
      gameHasStarted: false,
      gameHasFinished: false,
      winner: null,
    });

    act(() => {
      rendered.result.current.setGameAsStarted();
      rendered.result.current.setGameAsFinished();
      rendered.result.current.setGameWinner(player);
    });

    expect(rendered.result.current).to.deep.include({
      gameHasStarted: true,
      gameHasFinished: true,
      winner: player,
    });

    act(() => {
      rendered.result.current.resetGame();
    });

    expect(rendered.result.current).to.deep.include({
      gameHasStarted: true,
      gameHasFinished: false,
      winner: null,
    });
  });
});
