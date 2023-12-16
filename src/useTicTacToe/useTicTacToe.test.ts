import { describe, it, expect, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import type { PlayerCreationOptions, Player } from './types';
import useTicTacToe from './useTicTacToe';

const playerInputs: PlayerCreationOptions = [
  {
    icon: '👽',
    name: 'Agatha',
  },
  {
    icon: '🧛',
    name: 'Charles',
  },
];

const firstPlayer: Player = {
  icon: playerInputs[0].icon,
  name: playerInputs[0].name,
  score: 0,
};

const secondPlayer: Player = {
  icon: playerInputs[1].icon,
  name: playerInputs[1].name,
  score: 0,
};

describe('starting the game', () => {
  it('should initialise with a correct status', () => {
    const rendered = renderHook(() => useTicTacToe());
    expect(rendered.result.current.gameStatus).toBe('NOT_STARTED');
  });

  it('should initialise players correctly', () => {
    const rendered = renderHook(() => useTicTacToe());
    expect(rendered.result.current.players).to.be.null;
  });

  it('should initialise current player correctly', () => {
    const rendered = renderHook(() => useTicTacToe());
    expect(rendered.result.current.currentPlayer).to.be.null;
  });

  it('should initialise the board correctly', () => {
    const rendered = renderHook(() => useTicTacToe());

    expect(rendered.result.current.board).to.be.an('array').that.has.length(9);

    for (const [i, square] of rendered.result.current.board.entries()) {
      expect(square).to.deep.include({
        isOccupied: false,
        isWinning: false,
        occupiedBy: null,
        position: i,
      });
    }
  });

  it('should start the game and add players correctly', () => {
    const rendered = renderHook(() => useTicTacToe());

    expect(rendered.result.current.gameStatus).toBe('NOT_STARTED');
    expect(rendered.result.current.players).to.be.null;

    act(() => {
      rendered.result.current.handlers.handleStart(playerInputs);
    });

    expect(rendered.result.current).to.deep.include({
      gameStatus: 'IN_PROGRESS',
      players: [firstPlayer, secondPlayer],
      currentPlayer: firstPlayer,
      winner: null,
    });
  });
});

describe('handling moves', () => {
  it('should mark an unoccupied square as "occupied" once clicked', () => {
    const rendered = renderHook(() => useTicTacToe());

    act(() => {
      rendered.result.current.handlers.handleStart(playerInputs);
    });

    for (let i = 0; i < 9; i++) {
      const player = 0 === (i & 1) ? firstPlayer : secondPlayer;

      expect(rendered.result.current.board[i]).to.deep.include({
        isOccupied: false,
        occupiedBy: null,
        position: i,
      });

      act(() => {
        rendered.result.current.handlers.handleMove({
          playerIcon: player.icon,
          squarePosition: i,
        });
      });

      expect(rendered.result.current.board[i]).to.deep.include({
        isOccupied: true,
        occupiedBy: player.icon,
        position: i,
      });
    }
  });

  it.each([
    [firstPlayer, secondPlayer],
    [secondPlayer, firstPlayer],
  ])(
    'should not let player A pick any squares already occupied by player B',
    (playerA, playerB) => {
      const rendered = renderHook(() => useTicTacToe());

      for (let i = 0; i < 9; i++) {
        act(() => {
          rendered.result.current.handlers.handleMove({
            playerIcon: playerA.icon,
            squarePosition: i,
          });
        });

        expect(rendered.result.current.board[i]).to.deep.include({
          isOccupied: true,
          occupiedBy: playerA.icon,
          position: i,
        });

        act(() => {
          rendered.result.current.handlers.handleMove({
            playerIcon: playerB.icon,
            squarePosition: i,
          });
        });

        expect(rendered.result.current.board[i]).to.deep.include({
          isOccupied: true,
          occupiedBy: playerA.icon,
          position: i,
        });
      }
    },
  );

  it('should advance the current player when a move is made', () => {
    const rendered = renderHook(() => useTicTacToe());

    act(() => {
      rendered.result.current.handlers.handleStart(playerInputs);
    });

    for (let i = 0; i < 5; i++) {
      const [currentPlayer, nextPlayer] =
        0 === i % 2 ? [firstPlayer, secondPlayer] : [secondPlayer, firstPlayer];
      expect(rendered.result.current.currentPlayer).to.deep.equal(currentPlayer);

      act(() => {
        rendered.result.current.handlers.handleMove({
          playerIcon: currentPlayer.icon,
          squarePosition: i,
        });
      });
      expect(rendered.result.current.currentPlayer).to.deep.equal(nextPlayer);
    }
  });
});

describe('ending the game', () => {
  it('should end game correctly when a player wins', async () => {
    const rendered = renderHook(() => useTicTacToe());

    act(() => {
      rendered.result.current.handlers.handleStart(playerInputs);
    });

    expect(rendered.result.current.winner).to.be.null;
    expect(rendered.result.current.players!.map((player) => player.score)).to.deep.equal([0, 0]);

    const positions = [0, 4, 5, 8, 7, 6, 2, 3];

    for (const [i, position] of positions.entries()) {
      act(() => {
        const player = 0 === i % 2 ? firstPlayer : secondPlayer;
        rendered.result.current.handlers.handleMove({
          playerIcon: player.icon,
          squarePosition: position,
        });
      });

      expect(rendered.result.current).to.deep.include({
        winner: null,
        gameStatus: 'IN_PROGRESS',
      });
      expect(rendered.result.current.players!.map((player) => player.score)).to.deep.equal([0, 0]);
    }

    act(() => {
      vi.useFakeTimers();
      rendered.result.current.handlers.handleMove({
        playerIcon: firstPlayer.icon,
        squarePosition: 1,
      });
    });

    expect(rendered.result.current).to.deep.include({
      winner: firstPlayer,
      gameStatus: 'FINISHED',
    });

    act(() => {
      vi.advanceTimersByTime(2_000);
      vi.useRealTimers();
    });

    await waitFor(() => {
      expect(rendered.result.current).to.deep.include({
        winner: null,
        gameStatus: 'IN_PROGRESS',
      });
    });

    expect(rendered.result.current.players!.map((player) => player.score)).to.deep.equal([1, 0]);
    expect(rendered.result.current.board).to.be.an('array').that.is.not.empty;

    for (const [i, square] of rendered.result.current.board.entries()) {
      expect(square).to.deep.include({
        isOccupied: false,
        isWinning: false,
        occupiedBy: null,
        position: i,
      });
    }
  });

  it("should end game correctly when it's a draw", async () => {
    const rendered = renderHook(() => useTicTacToe());

    act(() => {
      rendered.result.current.handlers.handleStart(playerInputs);
    });

    expect(rendered.result.current.winner).to.be.null;
    expect(rendered.result.current.players!.map((player) => player.score)).to.deep.equal([0, 0]);

    const positions = [0, 1, 2, 4, 7, 5, 3, 6];

    for (const [i, position] of positions.entries()) {
      act(() => {
        const player = 0 === i % 2 ? firstPlayer : secondPlayer;
        rendered.result.current.handlers.handleMove({
          playerIcon: player.icon,
          squarePosition: position,
        });
      });

      expect(rendered.result.current).to.deep.include({
        winner: null,
        gameStatus: 'IN_PROGRESS',
      });
      expect(rendered.result.current.players!.map((player) => player.score)).to.deep.equal([0, 0]);
    }

    act(() => {
      vi.useFakeTimers();
      rendered.result.current.handlers.handleMove({
        playerIcon: firstPlayer.icon,
        squarePosition: 8,
      });
    });

    expect(rendered.result.current).to.deep.include({
      winner: null,
      gameStatus: 'FINISHED',
    });
    expect(rendered.result.current.players!.map((player) => player.score)).to.deep.equal([0, 0]);

    act(() => {
      vi.advanceTimersByTime(2_000);
      vi.useRealTimers();
    });

    await waitFor(() => {
      expect(rendered.result.current).to.deep.include({
        winner: null,
        gameStatus: 'IN_PROGRESS',
      });
    });

    expect(rendered.result.current.players!.map((player) => player.score)).to.deep.equal([0, 0]);
    expect(rendered.result.current.board).to.be.an('array').that.is.not.empty;

    for (const [i, square] of rendered.result.current.board.entries()) {
      expect(square).to.deep.include({
        isOccupied: false,
        isWinning: false,
        occupiedBy: null,
        position: i,
      });
    }
  });

  it('should reset the board and game status when the game is restarted', () => {
    const rendered = renderHook(() => useTicTacToe());

    expect(rendered.result.current.gameStatus).toBe('NOT_STARTED');

    act(() => {
      rendered.result.current.handlers.handleStart(playerInputs);
    });

    expect(rendered.result.current.gameStatus).toBe('IN_PROGRESS');

    for (let i = 0; i < 5; i++) {
      const player = 0 === i % 2 ? firstPlayer : secondPlayer;

      act(() => {
        rendered.result.current.handlers.handleMove({
          squarePosition: i,
          playerIcon: player.icon,
        });
      });

      expect(rendered.result.current.board[i]).to.deep.equal({
        isOccupied: true,
        isWinning: false,
        occupiedBy: player.icon,
        position: i,
      });
    }

    act(() => {
      rendered.result.current.handlers.handleRestart();
    });

    expect(rendered.result.current.board).to.be.an('array').that.is.not.empty;

    for (const [i, square] of rendered.result.current.board.entries()) {
      expect(square).to.deep.include({
        isOccupied: false,
        isWinning: false,
        occupiedBy: null,
        position: i,
      });
    }

    expect(rendered.result.current).to.deep.include({
      gameStatus: 'IN_PROGRESS',
      winner: null,
    });
  });
});
