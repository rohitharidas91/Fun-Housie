import { FaMagnifyingGlass } from 'react-icons/fa6';
import styles from './TicketDisplay.module.css'
import { useState } from 'react';

function TicketDisplay(props) {

    //Temporary Grid - This will be filled in when the ticket number is entered
    const ticketGrid = [];
    for (let i = 1; i <= 30; i++) {
        ticketGrid.push({num:'', isCalled: false});
    }

    //Create variable to hold ticket Id
    const [ticketId, setTicketId] = useState();

    //Insert Ticket numbers into grid based on ticketId
    // I'm creating this function here instead of Apps because I think its self contained
    // At least I hope that's the correct way of doing it anyway!

    const displayTicket = (ticket) => {
        const ticketToDisplay = props.tickets.ticket(1);
        alert(ticketToDisplay);
    }

    // Reminder: I dont want to store the isCalled in tickets. Rather check the board where the numbers match and set the isCalled from there.
    //It's late now I'm going to bed :) UI is done yay!

    
    return(
        <div className={styles.ticketDisplay}>
            <div className={styles.ticketDisplayHeader}>
                <input 
                    type='text' 
                    className={styles.ticketNum} 
                    placeholder='Enter ticket number...'
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
                    />
                <button 
                    className={styles.btnView}
                    onClick={() => displayTicket(ticketId)}
                ><FaMagnifyingGlass/></button>
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