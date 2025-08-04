import calculateWinner from './calculateWinner';

export default function makeComputerMove(squares) {
  const newSquares = [...squares];

  // Helper to simulate a move and check for winner
  const tryMove = (idx, symbol) => {
    const temp = [...squares];
    temp[idx] = symbol;
    return calculateWinner(temp) === symbol;
  };

  const emptyIndices = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  if (emptyIndices.length === 0) return squares;

  // 1. Win if possible
  for (let idx of emptyIndices) {
    if (tryMove(idx, 'O')) {
      newSquares[idx] = 'O';
      return newSquares;
    }
  }

  // 2. Block opponent's winning move
  for (let idx of emptyIndices) {
    if (tryMove(idx, 'X')) {
      newSquares[idx] = 'O';
      return newSquares;
    }
  }

  // 3. Take center if available
  if (squares[4] === null) {
    newSquares[4] = 'O';
    return newSquares;
  }

  // 4. Take a corner
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => squares[i] === null);
  if (availableCorners.length) {
    const randomCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)];
    newSquares[randomCorner] = 'O';
    return newSquares;
  }

  // 5. Take any side
  const sides = [1, 3, 5, 7];
  const availableSides = sides.filter(i => squares[i] === null);
  if (availableSides.length) {
    const randomSide = availableSides[Math.floor(Math.random() * availableSides.length)];
    newSquares[randomSide] = 'O';
    return newSquares;
  }

  // Fallback: random (should never hit this)
  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  newSquares[randomIndex] = 'O';
  return newSquares;
}
