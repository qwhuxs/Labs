import React from 'react';

export default function Button({ text, onClick, type = "primary" }) {
  return (
    <button className={`btn btn-${type}`} onClick={onClick}>
      {text}
    </button>
  );
}