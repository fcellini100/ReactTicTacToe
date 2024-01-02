const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const X_ICON = 'X';
export const O_ICON = 'O';
export const STATUS_PREFIX = 'Next player: ';
export const WINNER_PREFIX = 'Winner: ';
export const DEFAULT_STATUS = `${STATUS_PREFIX}${X_ICON}`;

export function calculateWinner(squares) {
  for (let i = 0; i < WINNING_LINES.length; i++) {
    const [a, b, c] = WINNING_LINES[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function getIcon(xIsNext) {
  return xIsNext ? X_ICON : O_ICON;
}

export function getNewStatus(winner) {
  if (winner) {
    return WINNER_PREFIX + winner;
  }
  return STATUS_PREFIX + getIcon();
}