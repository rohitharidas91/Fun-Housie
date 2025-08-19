import { useState } from 'react';
import './App.css'
import Header from '../Header/Header'
import GameMenu from '../GameMenu/GameMenu';
import Board from '../Board/Board';
import Timer from '../Timer/Timer'
import TicketGenerator from '../TicketGenerator/TicketGenerator';
import TicketList from '../TicketList/TicketList';
import TicketDisplay from '../TicketDisplay/TicketDisplay';
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
  
  //This is a temporary array for tickets... I am manually making them but will do it through a function later on
  const [tickets, setTickets] = useState([
    {
      ticketId: 1,
      playerName: 'Test Pleyer One',
      ticketNumbers: [1, 3, 10, 21, 37, 39, 46, 53, 59, 60, 65, 66, 76, 88, 90],
      isSelected: true
    },
    {
      ticketId: 2,
      playerName: 'Test Pleyer Two',
      ticketNumbers: [4, 13, 20, 26, 30, 40, 44, 55, 56, 68, 69, 72, 74, 86, 88],
      isSelected: false
    },
    {
      ticketId: 3,
      playerName: 'Test Pleyer Two',
      ticketNumbers: [4, 13, 20, 26, 30, 40, 44, 55, 56, 68, 69, 72, 74, 86, 88],
      isSelected: false
    },
    {
      ticketId: 4,
      playerName: 'Test Pleyer Two',
      ticketNumbers: [4, 13, 20, 26, 30, 40, 44, 55, 56, 68, 69, 72, 74, 86, 88],
      isSelected: false
    },
    {
      ticketId: 5,
      playerName: 'Test Pleyer Two',
      ticketNumbers: [4, 13, 20, 26, 30, 40, 44, 55, 56, 68, 69, 72, 74, 86, 88],
      isSelected: false
    },
    {
      ticketId: 6,
      playerName: 'Test Pleyer Two',
      ticketNumbers: [4, 13, 20, 26, 30, 40, 44, 55, 56, 68, 69, 72, 74, 86, 88],
      isSelected: false
    },
    {
      ticketId: 7,
      playerName: 'Test Pleyer Two',
      ticketNumbers: [4, 13, 20, 26, 30, 40, 44, 55, 56, 68, 69, 72, 74, 86, 88],
      isSelected: false
    },
    {
      ticketId: 8,
      playerName: 'Test Pleyer Two',
      ticketNumbers: [4, 13, 20, 26, 30, 40, 44, 55, 56, 68, 69, 72, 74, 86, 88],
      isSelected: false
    },
    {
      ticketId: 9,
      playerName: 'Test Pleyer Two',
      ticketNumbers: [4, 13, 20, 26, 30, 40, 44, 55, 56, 68, 69, 72, 74, 86, 88],
      isSelected: false
    },
  ]);

  const toggleSelected = (id) => {
    setTickets(prev => {
      return prev.map(ticket => {
        if(ticket.ticketId === id) {
          return {...ticket, isSelected: !ticket.isSelected}
        }
        return ticket;
      });
    });
  };
  

  return (

    <ThemeProvider>
      <Header gameOver={gameOver} />
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
            callNumber={callNumber}
          />
          <Board
            gridNum={gridNum}
            setGridNum={setGridNum}
          />
        </div>
        <div className='appRight'>
          <div className='appRightUpper'>
            <div className='appRightUpper-left'>
              <Timer
                speed={speed}
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
                pause={pause}
                callNumber={callNumber}
                currentNum={currentNum}
                setCurrentNum={setCurrentNum}
              />
            </div>
            <div className='appRightUpper-right'>
              <TicketGenerator />
              <TicketList
                tickets={tickets}
                onTicketSelect={toggleSelected}
              />
            </div>
          </div>
          <div className='appRightLower'>
            <TicketDisplay />
          </div>
        </div>

      </div>
    </ThemeProvider>

  )
}

export default App
