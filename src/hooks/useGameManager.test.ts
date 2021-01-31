import { renderHook, act } from "@testing-library/react-hooks";
import { Player } from "../types/usePlayersManager";
import useGameManager from "./useGameManager";

describe("useGameManager hook", () => {
  const player: Player = {
    icon: "🧟",
    index: 0,
    name: "Arthur",
    score: 14,
  };

  it("should expose an object with correct interface and initial state", () => {
    const rendered = renderHook(() => useGameManager());

    expect(rendered.result.current).toEqual(
      expect.objectContaining({
        gameHasStarted: false,
        gameHasFinished: false,
        winner: null,
        setGameAsStarted: expect.any(Function),
        setGameAsFinished: expect.any(Function),
        setGameWinner: expect.any(Function),
        resetGame: expect.any(Function),
      })
    );
  });

  it("should set gameHasStarted property to true", () => {
    const rendered = renderHook(() => useGameManager());
    expect(rendered.result.current.gameHasStarted).toBe(false);

    act(() => rendered.result.current.setGameAsStarted());

    expect(rendered.result.current.gameHasStarted).toBe(true);
  });

  it("should set gameHasFinished property to true", () => {
    const rendered = renderHook(() => useGameManager());
    expect(rendered.result.current.gameHasFinished).toBe(false);

    act(() => rendered.result.current.setGameAsFinished());

    expect(rendered.result.current.gameHasFinished).toBe(true);
  });

  it("should set winner correctly", () => {
    const rendered = renderHook(() => useGameManager());
    expect(rendered.result.current.winner).toBeNull();

    act(() => rendered.result.current.setGameWinner(player));

    expect(rendered.result.current.winner).toEqual(player);
  });

  it("should reset the game correctly", () => {
    const rendered = renderHook(() => useGameManager());
    expect(rendered.result.current.gameHasStarted).toBe(false);
    expect(rendered.result.current.gameHasFinished).toBe(false);
    expect(rendered.result.current.winner).toBe(null);

    act(() => {
      rendered.result.current.setGameAsStarted();
      rendered.result.current.setGameAsFinished();
      rendered.result.current.setGameWinner(player);
    });

    expect(rendered.result.current.gameHasStarted).toBe(true);
    expect(rendered.result.current.gameHasFinished).toBe(true);
    expect(rendered.result.current.winner).toBe(player);

    act(() => {
      rendered.result.current.resetGame();
    });

    expect(rendered.result.current.gameHasStarted).toBe(true);
    expect(rendered.result.current.gameHasFinished).toBe(false);
    expect(rendered.result.current.winner).toBe(null);
  });
});
