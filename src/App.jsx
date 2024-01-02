import { useState, useEffect } from 'react';
import * as utils from './utils';

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState(utils.DEFAULT_STATUS);

  useEffect(() => {
    const winner = utils.calculateWinner(squares);
    const status = utils.getNewStatus(winner);
    setStatus(status);
  }, [squares]);

  const updateSquares = (index) => {
    const nextSquares = squares.slice();
    const icon = utils.getIcon(xIsNext);
    nextSquares[index] = icon;
    setXIsNext(!xIsNext);
    setSquares(nextSquares);
  };

  const handleClick = (index) => {
    const winner = utils.calculateWinner(squares);
    if (squares[index] || winner) {
      return;
    }

    updateSquares(index);
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

const Square = ({ value, onSquareClick }) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Board;