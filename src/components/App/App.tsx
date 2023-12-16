import useTicTacToe from '../../useTicTacToe/useTicTacToe';
import Board from '../Board/Board';
import Score from '../Score/Score';
import StartMenu from '../StartMenu/StartMenu';
import Status from '../Status/Status';

export default function App() {
  const ticTacToe = useTicTacToe();

  let children = null;

  if (ticTacToe.gameStatus === 'NOT_STARTED') {
    children = <StartMenu handleStart={ticTacToe.handlers.handleStart} />;
  } else if (ticTacToe.players) {
    children = (
      <>
        <Status
          currentPlayer={ticTacToe.currentPlayer}
          status={ticTacToe.gameStatus}
          winner={ticTacToe.winner}
        />
        <Board
          board={ticTacToe.board}
          currentPlayer={ticTacToe.currentPlayer}
          status={ticTacToe.gameStatus}
          handleMove={ticTacToe.handlers.handleMove}
        />
        <Score players={ticTacToe.players} />
      </>
    );
  } else {
    children = <p>Loading the game...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <main className="grid flex-col justify-center w-11/12 max-w-max space-y-3 place-items-center">
        {children}
      </main>
    </div>
  );
}
