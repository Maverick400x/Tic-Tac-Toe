// src/utils/makeComputerMove.js

export default function makeComputerMove(squares) {
  // Get all empty square indexes
  const emptyIndices = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  if (emptyIndices.length === 0) return squares; // No move possible

  // Randomly pick one empty square
  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

  const newSquares = [...squares];
  newSquares[randomIndex] = 'O'; // Computer is always 'O'

  return newSquares;
}