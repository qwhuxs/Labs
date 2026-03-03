import React from 'react';

export default function AnagramBox({ scrambledWord }) {
  return (
    <div className="anagram-box">
      <p className="scrambled-word">{scrambledWord}</p>
      <input
        type="text"
        placeholder="Введіть правильне слово"
        className="answer-input"
        disabled 
      />
    </div>
  );
}