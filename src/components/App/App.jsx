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
  const [playerName, setPlayerName] = useState('');


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
  const [tickets, setTickets] = useState([]);

  const toggleSelected = (id) => {
    setTickets(prev => {
      return prev.map(ticket => {
        if (ticket.ticketId === id) {
          return { ...ticket, isSelected: !ticket.isSelected }
        }
        return ticket;
      });
    });
  };

  /**
 * A factory function to generate unique ticket objects.
 * This function maintains a counter for a serially increasing ticketId.
 */
  const [ticketCounter, setTicketCounter] = useState(1);

  function generateTicket(playerName) {

    if (!playerName) {
      alert('Please enter player name');
    } else {

      //Need to do it this way because setTicket counter is async. It bugged out everything!
      
      setTicketCounter(prevCounter => prevCounter + 1);

      const ticketNumbers = [];
      const allPossibleNumbers = Array.from({ length: 90 }, (_, i) => i + 1);

      for (let i = allPossibleNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allPossibleNumbers[i], allPossibleNumbers[j]] = [allPossibleNumbers[j], allPossibleNumbers[i]];
      }
      for (let i = 0; i < 15; i++) {
        ticketNumbers.push(allPossibleNumbers[i]);
      }

      ticketNumbers.sort((a, b) => a - b);

      const newTicket = {
        ticketId: ticketCounter,
        playerName: playerName,
        ticketNumbers: ticketNumbers,
        isSelected: false,
      };

      // Update the tickets state by adding the new ticket.
      setTickets(prevTickets => [...prevTickets, newTicket]);
    }
  }

  function removeTicket(ticketToRemove) {
    const updatedTickets = tickets.filter(ticket => ticket.ticketId !== ticketToRemove.ticketId);
    setTickets(updatedTickets);
  }

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
              <TicketGenerator
                clickGenerate={generateTicket}
                playerName={playerName}
                setPlayerName={setPlayerName}
              />
              <TicketList
                tickets={tickets}
                onTicketSelect={toggleSelected}
                clickDelete={removeTicket}
              />
            </div>
          </div>
          <div className='appRightLower'>
            <TicketDisplay
              tickets={tickets}
            />
          </div>
        </div>

      </div>
    </ThemeProvider>

  )
}

export default App
