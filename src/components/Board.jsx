import React from 'react';
import Square from './Square';
import '../App.css';

export default function Board({ squares, onSquareClick }) {
  return (
    <div className="board">
      {squares.map((_, i) => (
        <Square
          key={i}
          value={squares[i]}
          onClick={() => onSquareClick(i)}
        />
      ))}
    </div>
  );
}