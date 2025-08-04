import React from 'react';
import '../App.css';

export default function Square({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`square ${value === 'X' ? 'x' : value === 'O' ? 'o' : ''}`}
      disabled={!!value}
    >
      {value}
    </button>
  );
}