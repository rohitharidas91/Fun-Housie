import { useState } from 'react';
import './App.css'
import Header from '../Header/Header'
import GameMenu from '../GameMenu/GameMenu';
import Board from '../Board/Board';
import Timer from '../Timer/Timer'
import '../Theme/theme.css';
import ThemeProvider from '../Theme/ThemeProvider'

function App() {

  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [pause, setPause] = useState(true)
  const [speed, setSpeed] = useState(10); // initate speed at 10
  const [timeLeft, setTimeLeft] = useState(speed)
  const [currentNum, setCurrentNum] = useState(0);

  //Reset Game function
  function resetGame() {
    setGridNum(prevGrid => 
        prevGrid.map(item => ({ ...item, isCalled: false }))
    );
    setGameStarted(false);
    setPause(true);
    setGameOver(false)
    setTimeLeft(speed); // Reset the timer
    setCurrentNum(0);   // Reset the current number
}

  //Initialize the Game Board
  //Create an array with the numbers 1-90
  const [gridNum, setGridNum] = useState(() => {
    const initialNumbers = [];
    for (let i = 1; i <= 90; i++) {
      initialNumbers.push({ num: i, isCalled: false });
    }
    return initialNumbers;
  });

  //Need to Randomly start calling numbers
  function callNumber() {
    const uncalledNumbers = gridNum
      .filter(item => !item.isCalled)
      .map(item => item.num);
    //Would need to create a gameover state here
    if (uncalledNumbers.length === 0) {
      setGameOver(true);
      setPause(true);
      return;
    }
    //We need to generate a random number from the uncalled numbers.
    const randomIndex = Math.floor(Math.random() * uncalledNumbers.length);
    const calledNum = uncalledNumbers[randomIndex];

    setGridNum(prev =>
      prev.map(item =>
        item.num === calledNum ? { ...item, isCalled: !item.isCalled } : item
      )
    );

    setCurrentNum(calledNum)
  }

  return (

    <ThemeProvider>
      <Header gameOver={gameOver}/>
      <div className='appBody'>
        <div className='appLeft'>
          <GameMenu
            speed={speed}
            setSpeed={setSpeed}
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
            gameOver={gameOver}
            resetGame={resetGame}
            pause={pause}
            setPause={setPause}
          />
          <Board
            gridNum={gridNum}
            setGridNum={setGridNum}
          />
        </div>
        <div className='appRight'>
          <div className='appRightUpper'>
            <Timer
              speed={speed}
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              pause={pause}
              callNumber={callNumber}
              currentNum={currentNum}
              setCurrentNum={setCurrentNum}
            />
            <div>PlaceholderDiv</div>
          </div>
        </div>

      </div>
    </ThemeProvider>

  )
}

export default App
