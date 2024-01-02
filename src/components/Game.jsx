import { useState } from 'react';
import * as utils from './utils';
import Board from './Board';

const Game = () => {
  const [history, setHistory] = useState(utils.DEFAULT_HISTORY_VALUE);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const getDescription = (moveNumber) => {
    if (moveNumber > 0) {
      return utils.GO_TO_MOVE + moveNumber;
    }
    return utils.RESTART;
  };

  const moves = history.map((_squares, move) => {
    const description = getDescription(move);

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
