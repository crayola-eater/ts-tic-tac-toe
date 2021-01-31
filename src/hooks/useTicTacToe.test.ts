import { renderHook, act } from "@testing-library/react-hooks";
import { StartMenuFormData } from "../types/StartMenu";
import { BoardManager, BoardSquare } from "../types/useBoardManager";
import { GameManager } from "../types/useGameManager";
import { Player, PlayersManager } from "../types/usePlayersManager";
import useTicTacToe from "./useTicTacToe";

describe("useTicTacToe hook", () => {
  const testProps: StartMenuFormData = {
    player1Icon: "👽",
    player1Name: "Agatha",
    player2Icon: "🧛",
    player2Name: "Charles",
  };

  it("should expose an object with correct interface", () => {
    const rendered = renderHook(() => useTicTacToe());
    expect(rendered.result.current).toEqual(
      expect.objectContaining({
        boardManager: expect.objectContaining<BoardManager>({
          board: Array.from(
            { length: 9 },
            (_, i): BoardSquare => {
              return {
                isOccupied: false,
                isWinning: false,
                occupiedBy: null,
                position: i,
              };
            }
          ),
          setSquareAsOccupied: expect.any(Function),
          setSquaresAsWinning: expect.any(Function),
          resetBoard: expect.any(Function),
        }),
        playersManager: expect.objectContaining<Partial<PlayersManager>>({
          players: [],
          currentPlayer: undefined,
          currentPlayerIndex: 0,
          addPlayer: expect.any(Function),
          incrementPlayerScore: expect.any(Function),
          setNextPlayer: expect.any(Function),
        }),
        gameManager: expect.objectContaining<GameManager>({
          gameHasStarted: false,
          gameHasFinished: false,
          winner: null,
          setGameAsStarted: expect.any(Function),
          setGameAsFinished: expect.any(Function),
          setGameWinner: expect.any(Function),
          resetGame: expect.any(Function),
        }),
        handlers: expect.objectContaining({
          handleMove: expect.any(Function),
          handleStart: expect.any(Function),
          handleRestart: expect.any(Function),
        }),
      })
    );
  });

  it("should start the game and add players correctly", () => {
    const rendered = renderHook(() => useTicTacToe());

    expect(rendered.result.current.gameManager.gameHasStarted).toEqual(false);
    expect(rendered.result.current.playersManager.players).toEqual([]);

    act(() => {
      rendered.result.current.handlers.handleStart(testProps);
    });

    expect(rendered.result.current.gameManager.gameHasStarted).toEqual(true);
    expect(rendered.result.current.playersManager.players).toEqual<Player[]>([
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
    ]);
  });

  it("should handle moves correctly", () => {
    const rendered = renderHook(() => useTicTacToe());

    expect(
      rendered.result.current.boardManager.board.every(
        (square) => !square.isOccupied
      )
    ).toBe(true);

    act(() => {
      rendered.result.current.handlers.handleStart(testProps);
    });

    const [
      firstPlayer,
      secondPlayer,
    ] = rendered.result.current.playersManager.players;

    const firstSquareIndex = 0;
    const secondSquareIndex = 1;

    act(() => {
      rendered.result.current.handlers.handleMove(
        firstSquareIndex,
        firstPlayer
      );
    });

    expect(
      rendered.result.current.boardManager.board[firstSquareIndex]
    ).toEqual<BoardSquare>({
      isOccupied: true,
      isWinning: false,
      occupiedBy: firstPlayer.icon,
      position: firstSquareIndex,
    });

    act(() => {
      rendered.result.current.handlers.handleMove(
        firstSquareIndex,
        secondPlayer
      );
    });

    expect(
      rendered.result.current.boardManager.board[firstSquareIndex]
    ).toEqual<BoardSquare>({
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
      rendered.result.current.handlers.handleMove(
        secondSquareIndex,
        secondPlayer
      );
    });

    expect(
      rendered.result.current.boardManager.board[secondSquareIndex]
    ).toEqual(
      expect.objectContaining<BoardSquare>({
        isOccupied: false,
        isWinning: false,
        occupiedBy: null,
        position: secondSquareIndex,
      })
    );
  });

  it("should restart the game correctly", () => {
    const rendered = renderHook(() => useTicTacToe());

    act(() => {
      rendered.result.current.handlers.handleStart(testProps);
    });

    const [
      firstPlayer,
      secondPlayer,
    ] = rendered.result.current.playersManager.players;

    const firstSquareIndex = 5;
    const secondSquareIndex = 2;

    act(() => {
      rendered.result.current.handlers.handleMove(
        firstSquareIndex,
        firstPlayer
      );
      rendered.result.current.handlers.handleMove(
        secondSquareIndex,
        secondPlayer
      );
    });

    expect(
      rendered.result.current.boardManager.board[firstSquareIndex]
    ).toEqual<BoardSquare>({
      isOccupied: true,
      isWinning: false,
      occupiedBy: firstPlayer.icon,
      position: firstSquareIndex,
    });

    expect(
      rendered.result.current.boardManager.board[secondSquareIndex]
    ).toEqual<BoardSquare>({
      isOccupied: true,
      isWinning: false,
      occupiedBy: secondPlayer.icon,
      position: secondSquareIndex,
    });

    act(() => {
      rendered.result.current.handlers.handleRestart();
    });

    expect(rendered.result.current.boardManager.board).toEqual(
      expect.arrayContaining([
        expect.objectContaining<BoardSquare>({
          isOccupied: false,
          isWinning: false,
          occupiedBy: null,
          position: expect.any(Number),
        }),
      ])
    );
    expect(rendered.result.current.gameManager).toEqual(
      expect.objectContaining<Partial<GameManager>>({
        gameHasStarted: true,
        gameHasFinished: false,
        winner: null,
      })
    );
  });

  it("should calculate the winner correctly", () => {
    const rendered = renderHook(() => useTicTacToe());

    act(() => {
      rendered.result.current.handlers.handleStart(testProps);
    });

    const [
      firstPlayer,
      secondPlayer,
    ] = rendered.result.current.playersManager.players;

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

    expect(rendered.result.current.gameManager.winner).toEqual(firstPlayer);
    expect(rendered.result.current.gameManager.gameHasFinished).toBe(true);
  });
});
