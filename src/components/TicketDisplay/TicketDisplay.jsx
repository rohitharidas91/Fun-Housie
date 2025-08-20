import { FaMagnifyingGlass } from 'react-icons/fa6';
import styles from './TicketDisplay.module.css'

function TicketDisplay(props) {

    //Temporary Grid - This will be filled in when the ticket number is entered
    const ticketGrid = [];
    for (let i = 1; i <= 30; i++) {
        ticketGrid.push({num:i, isCalled: false});
    }

    // Reminder: I dont want to store the isCalled in tickets. Rather check the board where the numbers match and set the isCalled from there.
    //It's late now I'm going to bed :) UI is done yay!

    
    return(
        <div className={styles.ticketDisplay}>
            <div className={styles.ticketDisplayHeader}>
                <input type='text' className={styles.ticketNum} placeholder='Enter ticket number...'/>
                <button className={styles.btnView}><FaMagnifyingGlass/></button>
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