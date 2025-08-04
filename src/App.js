import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import calculateWinner from './utils/calculateWinner';
import makeComputerMove from './utils/makeComputerMove';
import './App.css';

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [namesSubmitted, setNamesSubmitted] = useState(false);
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [matchNumber, setMatchNumber] = useState(1);

  const winner = calculateWinner(squares);
  const isDraw = squares.every(Boolean) && !winner;
  const currentPlayer = xIsNext ? 'X' : 'O';

  useEffect(() => {
    if (mode === 'PvC' && !xIsNext && !winner && !isDraw) {
      const timeout = setTimeout(() => {
        const newSquares = makeComputerMove(squares);
        setSquares(newSquares);
        setXIsNext(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [xIsNext, squares, mode, winner, isDraw]);

  const handleSquareClick = (i) => {
    if (squares[i] || winner || (mode === 'PvC' && !xIsNext)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = currentPlayer;
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const handleNextGame = () => {
    handleRestart();
    setMatchNumber((prev) => prev + 1);
  };

  const handleModeSelection = (selectedMode) => {
    setMode(selectedMode);
    setGameStarted(true);
    setNamesSubmitted(false);
    setPlayerX('');
    setPlayerO('');
    setMatchNumber(1);
    handleRestart();
  };

  const handleSubmitNames = () => {
    const trimmedX = playerX.trim();
    const trimmedO = playerO.trim();

    if (
      trimmedX === '' ||
      trimmedX.toLowerCase() === 'player x' ||
      (mode === 'PvP' &&
        (trimmedO === '' || trimmedO.toLowerCase() === 'player o'))
    ) {
      alert('Please enter valid custom player name(s).');
      return;
    }

    if (mode === 'PvC' && trimmedO === '') {
      setPlayerO('Computer');
    }

    setPlayerX(trimmedX);
    setPlayerO(mode === 'PvC' ? 'Computer' : trimmedO);
    setNamesSubmitted(true);
  };

  const getDisplayName = (symbol) =>
    symbol === 'X' ? playerX : symbol === 'O' ? playerO : '';

  return (
    <div className="app-container">
      {!gameStarted ? (
        <div className="start-screen">
          <h1 className="title">🎮 Welcome to Tic Tac Toe</h1>
          <p>Challenge your friends or test your skills against the computer.</p>
          <p>Select your game mode:</p>
          <div className="button-group">
            <button onClick={() => handleModeSelection('PvP')} className="button">
              🧑‍🤝‍🧑 Player vs Player
            </button>
            <button onClick={() => handleModeSelection('PvC')} className="button">
              🤖 Player vs Computer
            </button>
          </div>
        </div>
      ) : !namesSubmitted ? (
        <div className="card">
          <h1 className="title">📝 Enter Player Name{mode === 'PvP' ? 's' : ''}</h1>
          <div className="input-group">
            <input
              type="text"
              placeholder="Player X name"
              value={playerX}
              onChange={(e) => setPlayerX(e.target.value)}
              className="input"
            />
            {mode === 'PvP' && (
              <input
                type="text"
                placeholder="Player O name"
                value={playerO}
                onChange={(e) => setPlayerO(e.target.value)}
                className="input"
              />
            )}
          </div>
          <div className="button-group vertical">
            <button onClick={handleSubmitNames} className="button">
              ✅ Start Game
            </button>
            <button
              onClick={() => {
                setGameStarted(false);
                setMatchNumber(1);
              }}
              className="button"
            >
              🏠 Back to Menu
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <h1 className="title">🎯 Tic Tac Toe</h1>
          <div className="match-number">🎲 Match {matchNumber}</div>
          <div className="status">
            {winner
              ? `🏆 Winner: ${getDisplayName(winner)} (${winner})`
              : isDraw
              ? '🤝 It\'s a Draw!'
              : mode === 'PvC'
              ? xIsNext
                ? `${playerX}'s Turn (X)`
                : 'Computer\'s Turn (O)'
              : `${getDisplayName(currentPlayer)}'s Turn (${currentPlayer})`}
          </div>
          <Board squares={squares} onSquareClick={handleSquareClick} />
          <div className="button-group vertical">
            {(winner || isDraw) && (
              <button onClick={handleNextGame} className="button">
                ⏭️ Next Match
              </button>
            )}
            <button onClick={handleRestart} className="button">
              🔁 Restart Game
            </button>
            <button
              onClick={() => {
                setGameStarted(false);
                setMatchNumber(1);
              }}
              className="button"
            >
              🏠 Back to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
