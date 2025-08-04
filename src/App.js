import React, { useState, useEffect, useRef } from 'react';
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

  // 🔊 Sound references
  const popSound = useRef(null);
  const winSound = useRef(null);
  const loseSound = useRef(null);
  const drawSound = useRef(null);
  const buttonSound = useRef(null);

  useEffect(() => {
    if (mode === 'PvC' && !xIsNext && !winner && !isDraw) {
      const timeout = setTimeout(() => {
        const newSquares = makeComputerMove(squares);
        setSquares(newSquares);
        setXIsNext(true);
        popSound.current.play();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [xIsNext, squares, mode, winner, isDraw]);

  useEffect(() => {
    if (winner) {
      if (mode === 'PvC' && winner === 'O') {
        loseSound.current.play();
      } else {
        winSound.current.play();
      }
    } else if (isDraw) {
      drawSound.current.play();
    }
  }, [winner, isDraw]);

  const handleSquareClick = (i) => {
    if (squares[i] || winner || (mode === 'PvC' && !xIsNext)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = currentPlayer;
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    popSound.current.play();
  };

  const handleButtonClick = (action) => {
    buttonSound.current.play();
    action();
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
    buttonSound.current.play();
    setMode(selectedMode);
    setGameStarted(true);
    setNamesSubmitted(false);
    setMatchNumber(1);
    handleRestart();
    setPlayerO(selectedMode === 'PvC' ? 'Computer' : '');
  };

  const handleSubmitNames = () => {
    if (playerX.trim() && (mode === 'PvC' || playerO.trim())) {
      buttonSound.current.play();
      setNamesSubmitted(true);
    } else {
      alert('Please enter valid player name(s).');
    }
  };

  const getDisplayName = (symbol) =>
    symbol === 'X' ? playerX : symbol === 'O' ? playerO : '';

  return (
    <div className="app-container">
      {/* 🔊 Audio Elements */}
      <audio ref={popSound} src="/sounds/pop.mp3" />
      <audio ref={winSound} src="/sounds/win.mp3" />
      <audio ref={loseSound} src="/sounds/lose.mp3" />
      <audio ref={drawSound} src="/sounds/draw.wav" />
      <audio ref={buttonSound} src="/sounds/light-switch.mp3" />

      {!gameStarted ? (
        <div className="start-screen">
          <h1 className="title">🎮 Welcome to Tic Tac Toe</h1>
          <p>Select your game mode:</p>
          <div className="button-group">
            <button onClick={() => handleModeSelection('PvP')} className="button">🧑‍🤝‍🧑 Player vs Player</button>
            <button onClick={() => handleModeSelection('PvC')} className="button">🤖 Player vs Computer</button>
          </div>
        </div>
      ) : !namesSubmitted ? (
        <div className="card">
          <h1 className="title">📝 Enter Player Name{mode === 'PvP' ? 's' : ''}</h1>
          <div className="input-group">
            <input
              type="text"
              placeholder="Your Username (X)"
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
            <button onClick={handleSubmitNames} className="button">✅ Start Game</button>
            <button
              onClick={() => handleButtonClick(() => {
                setGameStarted(false);
                setMatchNumber(1);
              })}
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
              <button onClick={() => handleButtonClick(handleNextGame)} className="button">
                ⏭️ Next Match
              </button>
            )}
            <button onClick={() => handleButtonClick(handleRestart)} className="button">🔁 Restart Game</button>
            <button
              onClick={() => handleButtonClick(() => {
                setGameStarted(false);
                setMatchNumber(1);
              })}
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
