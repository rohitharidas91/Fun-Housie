import { useState } from 'react';
import './App.css'
import Header from '../Header/Header'
import GameMenu from '../GameMenu/GameMenu';
import Board from '../Board/Board';
import Timer from '../Timer/Timer'
import TicketGenerator from '../TicketGenerator/TicketGenerator';
import TicketList from '../TicketList/TicketList';
import TicketDisplay from '../TicketDisplay/TicketDisplay';
import TicketPrintMenu from '../TicketPrintMenu/TicketPrintMenu';
import TicketPrint from '../TicketPrint/TicketPrint';
import '../Theme/theme.css';
import ThemeProvider from '../Theme/ThemeProvider'
import generateTicketNumbers from '../../util/generateTicketNumbers';


function App() {

  const [speed, setSpeed] = useState(10); // handled inside Timer because it has useEffect
  const [timeLeft, setTimeLeft] = useState(speed) // handled inside Timer because it has useEffect
  const [playerName, setPlayerName] = useState(''); // handled inside TicketGenerator
  const [selectedPlayer, setSelectedPlayer] = useState(''); // handled inside TicketPrintMenu

  // Game Menu Functions //

  // ********** Handle Game Status **********//

  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [pause, setPause] = useState(true)

  // ******** New Game ****** //

  function newGame() {
    if (gameStarted === false) {
      setGameStarted(true)
      setPause(false);
      callNumber();
    } else resetGame();
  }

  // ******** Reset Game ****** //

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


  // ******** Initialize the Game Board ********//
  //Create an array with the numbers 1-90

  const [gridNum, setGridNum] = useState(() => {
    const initialNumbers = [];
    for (let i = 1; i <= 90; i++) {
      initialNumbers.push({ num: i, isCalled: false });
    }
    return initialNumbers;
  });



  // ***** Randomly start calling numbers ***** //

  const [currentNum, setCurrentNum] = useState(0);

  function callNumber() {
    const uncalledNumbers = gridNum
      .filter(item => !item.isCalled)
      .map(item => item.num);

    if (uncalledNumbers.length === 0) {
      setGameOver(true); //If no more numbers are isCalled then its game over!
      setPause(true); //Pauses the timer once all numbers are called so it stops going in circles.
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


  // ****** Factory function to generate unique ticket objects.******* //

  const [tickets, setTickets] = useState([]);
  const [ticketCounter, setTicketCounter] = useState(1);

  function generateTicket(playerName) {
    if (!playerName) {
      alert('Please enter player name');
    } else {
      setTicketCounter(prevCounter => prevCounter + 1);
      // construct the ticket      
      const newTicket = {
        ticketId: ticketCounter,
        playerName: playerName,
        ticketNumbers: generateTicketNumbers(),
        isSelected: false,
      };
      // Update the tickets state by adding the new ticket.
      setTickets(prevTickets => [...prevTickets, newTicket]);
    }
  }



  // ****** Function to delete tickets.******* //

  function removeTicket(ticketToRemove) {
    const updatedTickets = tickets.filter(ticket => ticket.ticketId !== ticketToRemove.ticketId);
    setTickets(updatedTickets);
  }

  //******* Export Selected Tickets to pdf ********/



  // ****** App Component ***** //

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
            newGame={newGame}
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
                clickDelete={removeTicket}
              />
              <TicketPrintMenu
                tickets={tickets}
                selectedPlayer={selectedPlayer}
                setSelectedPlayer={setSelectedPlayer}
              >
                <TicketPrint
                  tickets={tickets}
                  selectedPlayer={selectedPlayer}
                />
              </TicketPrintMenu>
            </div>
          </div>
          <div className='appRightLower'>
            <TicketDisplay
              tickets={tickets}
              gridNum={gridNum}
            />
          </div>
        </div>
      </div>
      <footer>
        <p>Made with ❤️ by Blackheart!</p>
      </footer>
    </ThemeProvider >

  )
}

export default App
