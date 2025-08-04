import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import calculateWinner from './utils/calculateWinner';
import makeComputerMove from './utils/makeComputerMove';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [gridSize] = useState(3); // Fixed 3x3 grid
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState('player'); // 'player' or 'computer'
  const [gameOver, setGameOver] = useState(false);
  const playerX = 'Player X';
  const playerO = mode === 'computer' ? 'Computer' : 'Player O';

  useEffect(() => {
    if (mode === 'computer' && !xIsNext && !gameOver) {
      const computerMove = makeComputerMove(squares, gridSize);
      if (computerMove !== -1) {
        const newSquares = squares.slice();
        newSquares[computerMove] = 'O';
        setSquares(newSquares);
        setXIsNext(true);
      }
    }
  }, [squares, gridSize, xIsNext, gameOver, mode]);

  const handleClick = (i) => {
    if (squares[i] || gameOver || (mode === 'computer' && !xIsNext)) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newSquares, gridSize);
    if (winner) {
      setGameOver(true);
      toast.success(`🎉 ${winner === 'X' ? playerX : playerO} wins!`);
    } else if (!newSquares.includes(null)) {
      setGameOver(true);
      toast.info('It’s a draw!');
    }
  };

  const handleReset = () => {
    setSquares(Array(gridSize * gridSize).fill(null));
    setXIsNext(true);
    setGameOver(false);
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>

      <div className="mode-buttons">
        <button onClick={() => setMode('player')}>2 Players</button>
        <button onClick={() => setMode('computer')}>vs Computer</button>
      </div>

      <Board
        squares={squares}
        onClick={handleClick}
        gridSize={gridSize}
      />

      <div className="info">
        <p>Next: {xIsNext ? playerX : playerO}</p>
        <button onClick={handleReset}>Reset Game</button>
      </div>

      <ToastContainer position="bottom-center" />
    </div>
  );
}
