import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { Player } from '../hooks/usePlayersManager';
import usePlayersManager from './usePlayersManager';

describe('usePlayersManager hook', () => {
  const players: Player[] = [
    {
      icon: '🧟',
      index: 0,
      name: 'Arthur',
      score: 0,
    },
    {
      icon: '🧛',
      index: 1,
      name: 'Bernadette',
      score: 0,
    },
    {
      icon: '👽',
      index: 2,
      name: 'Miles',
      score: 0,
    },
  ];

  it('should add players correctly', () => {
    const rendered = renderHook(() => usePlayersManager());
    expect(rendered.result.current.players).to.be.an('array').that.is.empty;

    for (const [i, player] of players.entries()) {
      act(() => rendered.result.current.addPlayer(player));
      expect(rendered.result.current.players)
        .to.be.an('array')
        .that.has.length(i + 1)
        .and.deep.equals(players.slice(0, i + 1));
    }

    expect(rendered.result.current).to.deep.include({
      currentPlayerIndex: 0,
      currentPlayer: players[0],
    });
  });

  it('should move to the next player correctly', () => {
    const rendered = renderHook(() => usePlayersManager());

    expect(rendered.result.current).to.deep.include({
      currentPlayerIndex: 0,
      currentPlayer: undefined,
    });

    act(() => {
      players.forEach(rendered.result.current.addPlayer);
    });

    for (const [i, player] of players.entries()) {
      expect(rendered.result.current).to.deep.include({
        currentPlayerIndex: i,
        currentPlayer: player,
      });

      act(() => rendered.result.current.setNextPlayer());
    }
  });

  it('should be able to loop over players infinitely', () => {
    const rendered = renderHook(() => usePlayersManager());

    expect(rendered.result.current).to.deep.include({
      currentPlayerIndex: 0,
      currentPlayer: undefined,
    });

    act(() => {
      players.forEach(rendered.result.current.addPlayer);
    });

    for (let i = 1; i < players.length * 3; ++i) {
      act(() => rendered.result.current.setNextPlayer());

      const expectedIndex = i % players.length;
      const expectedPlayer = players[expectedIndex];

      expect(rendered.result.current).to.deep.include({
        currentPlayerIndex: expectedIndex,
        currentPlayer: expectedPlayer,
      });
    }
  });

  it("should increment a player's score correctly", () => {
    const rendered = renderHook(() => usePlayersManager());

    act(() => {
      players.forEach(rendered.result.current.addPlayer);
    });

    expect(rendered.result.current.players).to.be.an('array').that.is.not.empty;

    for (let i = 0; i < players.length; i++) {
      const oldScore = 0;
      const newScore = 1;
      expect(rendered.result.current.players[i].score).toBe(oldScore);

      act(() => rendered.result.current.incrementPlayerScore(i));

      expect(rendered.result.current.players[i].score).toBe(newScore);

      for (const player of rendered.result.current.players.slice(0, i)) {
        expect(player.score).toBe(1);
      }

      for (const player of rendered.result.current.players.slice(i + 1)) {
        expect(player.score).toBe(0);
      }
    }

    for (let i = 0; i < players.length; ++i) {
      const oldScore = 1;
      const newScore = 3;
      expect(rendered.result.current.players[i].score).toBe(oldScore);

      act(() => rendered.result.current.incrementPlayerScore(i, 2));

      expect(rendered.result.current.players[i].score).toBe(newScore);
      expect(rendered.result.current.players.slice(0, i + 1)).to.deep.equal(
        players.slice(0, i + 1).map((player) => {
          return {
            ...player,
            score: 3,
          };
        }),
      );
      expect(rendered.result.current.players.slice(i + 1)).toEqual(
        players.slice(i + 1).map((player) => {
          return {
            ...player,
            score: 1,
          };
        }),
      );
    }
  });
});
