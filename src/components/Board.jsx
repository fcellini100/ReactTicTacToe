import { useState, useEffect } from 'react';
import Square from './Square';
import * as utils from './utils';

const Board = ({ xIsNext, squares, onPlay }) => {
  const [status, setStatus] = useState(utils.DEFAULT_STATUS);

  useEffect(() => {
    const status = getNewStatus();
    setStatus(status);
  }, [xIsNext]);

  const getNewStatus = () => {
    const winner = utils.calculateWinner(squares);
    if (winner) {
      return utils.WINNER_PREFIX + winner;
    }

    const squaresAvailable = squares.some((square) => square === null);
    if (squaresAvailable) {
      return utils.STATUS_PREFIX + utils.getIcon(xIsNext);
    }

    return utils.DRAW;
  };

  const handleClick = (index) => {
    const winner = utils.calculateWinner(squares);
    if (squares[index] || winner) {
      return;
    }
    updateSquares(index);
  };

  const updateSquares = (index) => {
    const nextSquares = squares.slice();
    const icon = utils.getIcon(xIsNext);
    nextSquares[index] = icon;
    onPlay(nextSquares);
  };

  const renderSquare = (index) => {
    return <Square value={squares[index]} onSquareClick={() => handleClick(index)} />;
  };

  const renderRows = () => {
    const rows = [];
    for (let index = 0; index < squares.length; index += 3) {
      rows.push(
        <div key={index} className="board-row">
          {renderSquare(index)}
          {renderSquare(index + 1)}
          {renderSquare(index + 2)}
        </div>
      );
    }
    return rows;
  };

  return (
    <>
      <div className="status">{status}</div>
      {renderRows()}
    </>
  );
};

export default Board;
