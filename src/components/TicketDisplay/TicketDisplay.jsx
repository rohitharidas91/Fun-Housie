import { FaMagnifyingGlass } from 'react-icons/fa6';
import styles from './TicketDisplay.module.css'
import { useState } from 'react';

function TicketDisplay(props) {

    //Temporary Grid - This will be filled in when the ticket number is entered

    const initialGrid = []
    for (let i = 1; i <= 30; i++) {
        initialGrid.push({ num: '', isCalled: false })
    }

    const [ticketGrid, setTicketGrid] = useState(initialGrid);

    //Create variable to hold ticket Id
    const [ticketId, setTicketId] = useState();

    // I'm creating this function here instead of Apps because I think its self contained
    // At least I hope that's the correct way of doing it anyway!

    const displayTicket = (ticket) => {
        // If the box is empty prompt the user to enter a ticket ID
        if (!ticketId) {
            alert('Please enter a ticket ID');
            return;
        }

        const ticketToDisplay = props.tickets.find(ticket =>
            ticket.ticketId === parseInt(ticketId)
        );

        //If the ticket is not found 
        if (!ticketToDisplay) {
            alert('Ticket not found');
            return;
        }
        //Insert Ticket numbers into grid based on ticketId
        // Update the ticket grid with the found ticket numbers
        const updatedGrid = ticketGrid.map((cell, index) => {
            const num = ticketToDisplay.ticketNumbers[index] || '';
            return { ...cell, num };
        });

        setTicketGrid(updatedGrid);
    }

    // Reminder: I dont want to store the isCalled in tickets. Rather check the board where the numbers match and set the isCalled from there.
    //It's late now I'm going to bed :) UI is done yay!


    return (
        <div className={styles.ticketDisplay}>
            <div className={styles.ticketDisplayHeader}>
                <input
                    type='number'
                    className={styles.ticketNum}
                    placeholder='Enter ticket number...'
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
                />
                <button
                    className={styles.btnView}
                    onClick={displayTicket}
                ><FaMagnifyingGlass /></button>
                <span className={styles.winningTags}>
                    <p>jaldi five</p>
                    <p>jaldi seven</p>
                    <p>top line</p>
                    <p>bottom line</p>
                    <p>middle line</p>
                    <p>four corners</p>
                    <p>house</p>
                </span>
            </div>
            <div className={styles.ticketDisplayBody}>
                {ticketGrid.map((item, index) => (
                    <span
                        key={index}
                        className={styles.ticketCell}
                    >
                        {item.num}
                    </span>
                ))}
            </div>
        </div>
    )
}


export default TicketDisplay;