import { useState, useEffect } from 'react';
import Square from './Square';
import * as utils from './utils';

const Board = () => {
  const [squares, setSquares] = useState(utils.DEFAULT_SQUARES_VALUE);
  const [xIsNext, setXIsNext] = useState(utils.DEFAULT_XISNEXT);
  const [status, setStatus] = useState(utils.DEFAULT_STATUS);

  useEffect(() => {
    const status = getNewStatus();
    setStatus(status);
  }, [squares]);

  const updateSquares = (index) => {
    const nextSquares = squares.slice();
    const icon = utils.getIcon(xIsNext);
    nextSquares[index] = icon;
    setSquares(nextSquares);
  };

  const getNewStatus = () => {
    const winner = utils.calculateWinner(squares);
    if (winner) {
      return utils.WINNER_PREFIX + winner;
    }

    const squaresAvailable = squares.some((square) => square === null);
    if (squaresAvailable) {
      return utils.STATUS_PREFIX + utils.getIcon(xIsNext);
    }

    return utils.TIE;
  };

  const handleClick = (index) => {
    const winner = utils.calculateWinner(squares);
    if (squares[index] || winner) {
      return;
    }
    updateSquares(index);
    setXIsNext(!xIsNext);
  };

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
};

export default Board;
