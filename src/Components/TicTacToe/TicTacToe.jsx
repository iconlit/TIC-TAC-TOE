import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assests/circle.png';
import cross_icon from '../Assests/cross.png';

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const titleRef = useRef(null);

  const toggle = (e, num) => {
    if (lock || data[num] !== "") return; // Prevent overwriting and further moves after winning

    const newData = [...data];
    if (count % 2 === 0) {
      newData[num] = "x";
      setData(newData);
    } else {
      newData[num] = "o";
      setData(newData);
    }
    setCount(count + 1);
    checkWin(newData);
  };

  const checkWin = (newData) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
        won(newData[a]);
        return;
      }
    }

    // Check for a tie
    if (newData.every(cell => cell !== "")) {
      titleRef.current.innerHTML = "It's a Tie!";
      setLock(true);
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `Congratulations: <img src=${cross_icon} alt="X" />`;
    } else {
      titleRef.current.innerHTML = `Congratulations: <img src=${circle_icon} alt="O" />`;
    }
  };

  const resetGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setLock(false);
    titleRef.current.innerHTML = "Tic And Tac Then Toe";
  };

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>Tic And Tac Then Toe</h1>
      <div className='board'>
        <div className='row1'>
          {data.slice(0, 3).map((cell, index) => (
            <div key={index} className='boxes' onClick={(e) => toggle(e, index)}>
              {cell && <img src={cell === "x" ? cross_icon : circle_icon} alt={cell} />}
            </div>
          ))}
        </div>

        <div className='row2'>
          {data.slice(3, 6).map((cell, index) => (
            <div key={index + 3} className='boxes' onClick={(e) => toggle(e, index + 3)}>
              {cell && <img src={cell === "x" ? cross_icon : circle_icon} alt={cell} />}
            </div>
          ))}
        </div>

        <div className='row3'>
          {data.slice(6, 9).map((cell, index) => (
            <div key={index + 6} className='boxes' onClick={(e) => toggle(e, index + 6)}>
              {cell && <img src={cell === "x" ? cross_icon : circle_icon} alt={cell} />}
            </div>
          ))}
        </div>
      </div>
      <button className='reset' onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;
