import useTicTacToe from '../../hooks/useTicTacToe';
import Board from '../Board/Board';
import ResponsiveWrapper from '../ResponsiveWrapper/ResponsiveWrapper';
import Score from '../Score/Score';
import StartMenu from '../StartMenu/StartMenu';
import Status from '../Status/Status';

export default function App() {
  const ticTacToe = useTicTacToe();

  return (
    <ResponsiveWrapper>
      {0 === ticTacToe.playersManager.players.length ? (
        <StartMenu handleStart={ticTacToe.handlers.handleStart} />
      ) : (
        <>
          <Status
            currentPlayer={ticTacToe.playersManager.currentPlayer}
            gameHasFinished={ticTacToe.gameManager.gameHasFinished}
            winner={ticTacToe.gameManager.winner}
          />
          <Board
            board={ticTacToe.boardManager.board}
            currentPlayer={ticTacToe.playersManager.currentPlayer}
            gameHasFinished={ticTacToe.gameManager.gameHasFinished}
            handleMove={ticTacToe.handlers.handleMove}
          />
          <Score players={ticTacToe.playersManager.players} />
        </>
      )}
    </ResponsiveWrapper>
  );
}
