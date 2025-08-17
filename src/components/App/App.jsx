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
  const [pause, setPause] = useState(false)
  const [speed, setSpeed] = useState(10); // initate speed at 10
  const [timeLeft, setTimeLeft] = useState (speed)

  //Reset Game function
  function resetGame() {
    alert('reset the board'); //Need to add this funtionality later on
  }

  return (
    
      <ThemeProvider>
        <Header />  
        <div className='appBody'>
          <div className='appLeft'>
            <GameMenu 
              speed={speed} 
              setSpeed={setSpeed}
              gameStarted={gameStarted}
              setGameStarted={setGameStarted}
              resetGame={resetGame}
              pause={pause}
              setPause={setPause}
            />
            <Board />
          </div>
          <div className='appRight'>
            <div className='appRightUpper'>
              <Timer 
                speed={speed} 
                timeLeft={timeLeft} 
                setTimeLeft={setTimeLeft}
                pause={pause}
              />
              <div>PlaceholderDiv</div>
            </div>
          </div>

        </div>
      </ThemeProvider>
    
  )
}

export default App
