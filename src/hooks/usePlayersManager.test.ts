import { renderHook, act } from "@testing-library/react-hooks";
import { Player } from "../types/usePlayersManager";
import usePlayersManager from "./usePlayersManager";

describe("usePlayersManager hook", () => {
  const players: Player[] = [
    {
      icon: "🧟",
      index: 0,
      name: "Arthur",
      score: 0,
    },
    {
      icon: "🧛",
      index: 1,
      name: "Bernadette",
      score: 0,
    },
    {
      icon: "👽",
      index: 2,
      name: "Miles",
      score: 0,
    },
  ];

  it("should expose an object with correct interface and initial state", () => {
    const rendered = renderHook(() => usePlayersManager());
    expect(rendered.result.current).toEqual(
      expect.objectContaining({
        players: [],
        currentPlayer: undefined,
        currentPlayerIndex: 0,
        addPlayer: expect.any(Function),
        setNextPlayer: expect.any(Function),
        incrementPlayerScore: expect.any(Function),
      })
    );
  });

  it("should add players correctly", () => {
    const rendered = renderHook(() => usePlayersManager());
    expect(rendered.result.current.players.length).toBe(0);

    for (let i = 0; i < players.length; ++i) {
      act(() => rendered.result.current.addPlayer(players[i]));

      expect(rendered.result.current.players.length).toBe(i + 1);
      expect(rendered.result.current.players).toEqual(players.slice(0, i + 1));
    }

    expect(rendered.result.current.currentPlayerIndex).toBe(0);
    expect(rendered.result.current.currentPlayer).toEqual(players[0]);
  });

  it("should move to the next player correctly", () => {
    const rendered = renderHook(() => usePlayersManager());
    expect(rendered.result.current.currentPlayerIndex).toBe(0);
    expect(rendered.result.current.currentPlayer).toBeUndefined();

    act(() => {
      players.forEach(rendered.result.current.addPlayer);
    });

    expect(rendered.result.current.currentPlayerIndex).toBe(0);
    expect(rendered.result.current.currentPlayer).toEqual(players[0]);

    act(() => rendered.result.current.setNextPlayer());

    expect(rendered.result.current.currentPlayerIndex).toBe(1);
    expect(rendered.result.current.currentPlayer).toEqual(players[1]);

    act(() => rendered.result.current.setNextPlayer());

    expect(rendered.result.current.currentPlayerIndex).toBe(2);
    expect(rendered.result.current.currentPlayer).toEqual(players[2]);

    act(() => rendered.result.current.setNextPlayer());

    expect(rendered.result.current.currentPlayerIndex).toBe(0);
    expect(rendered.result.current.currentPlayer).toEqual(players[0]);
  });

  it("should be able to loop over players infinitely", () => {
    const rendered = renderHook(() => usePlayersManager());
    expect(rendered.result.current.currentPlayerIndex).toBe(0);
    expect(rendered.result.current.currentPlayer).toBeUndefined();

    act(() => {
      players.forEach(rendered.result.current.addPlayer);
    });

    for (let i = 1; i < players.length * 3; ++i) {
      act(() => rendered.result.current.setNextPlayer());

      const expectedIndex = i % players.length;

      expect(rendered.result.current.currentPlayerIndex).toBe(expectedIndex);
      expect(rendered.result.current.currentPlayer).toEqual(
        players[expectedIndex]
      );
    }
  });

  it("should increment a player's score correctly", () => {
    const rendered = renderHook(() => usePlayersManager());

    act(() => {
      players.forEach(rendered.result.current.addPlayer);
    });

    for (let i = 0; i < players.length; ++i) {
      expect(rendered.result.current.players[i].score).toBe(0);

      act(() => rendered.result.current.incrementPlayerScore(i));

      expect(rendered.result.current.players[i].score).toBe(1);
      expect(rendered.result.current.players.slice(0, i + 1)).toEqual(
        players.slice(0, i + 1).map((player) => {
          return {
            ...player,
            score: 1,
          };
        })
      );
      expect(rendered.result.current.players.slice(i + 1)).toEqual(
        players.slice(i + 1)
      );
    }

    for (let i = 0; i < players.length; ++i) {
      expect(rendered.result.current.players[i].score).toBe(1);

      act(() => rendered.result.current.incrementPlayerScore(i, 2));

      expect(rendered.result.current.players[i].score).toBe(3);
      expect(rendered.result.current.players.slice(0, i + 1)).toEqual(
        players.slice(0, i + 1).map((player) => {
          return {
            ...player,
            score: 3,
          };
        })
      );
      expect(rendered.result.current.players.slice(i + 1)).toEqual(
        players.slice(i + 1).map((player) => {
          return {
            ...player,
            score: 1,
          };
        })
      );
    }
  });
});
