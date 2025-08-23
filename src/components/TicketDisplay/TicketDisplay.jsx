import { FaMagnifyingGlass } from 'react-icons/fa6';
import styles from './TicketDisplay.module.css'
import { useState, useEffect } from 'react';

function TicketDisplay(props) {

    const initialGrid = Array(27).fill({ num: '', isCalled: false })
    const [ticketGrid, setTicketGrid] = useState(initialGrid);
    const [ticketId, setTicketId] = useState('');

    const updateTicketGrid = (ticketToDisplay) => {
        if (!ticketToDisplay) return;

        const topRow = ticketToDisplay.ticketNumbers[0];
        const midRow = ticketToDisplay.ticketNumbers[1];
        const botRow = ticketToDisplay.ticketNumbers[2];
        const allNumbers = [...topRow, ...midRow, ...botRow];

        const updatedGrid = allNumbers.map((num) => ({
            num: num || '',
            isCalled: num ? props.gridNum.some(item => item.num === num && item.isCalled) : false
        }));

        setTicketGrid(updatedGrid);
    };

    const displayTicket = () => {
        if (!ticketId) {
            setTicketGrid(initialGrid)
            return;
        }

        const ticketToDisplay = props.tickets.find(ticket =>
            ticket.ticketId === parseInt(ticketId)
        );

        if (!ticketToDisplay) {
            alert('Ticket not found');
            return;
        }

        updateTicketGrid(ticketToDisplay);
    }

    // Update ticket display when gridNum changes
    useEffect(() => {
        if (ticketId) {
            const ticketToDisplay = props.tickets.find(ticket =>
                ticket.ticketId === parseInt(ticketId)
            );
            if (ticketToDisplay) {
                updateTicketGrid(ticketToDisplay);
            }
        }
    }, [props.gridNum, props.tickets]);


    return (
        <div className={styles.ticketDisplay}>
            <div className={styles.ticketDisplayHeader}>
                <input
                    type='number'
                    className={styles.ticketNum}
                    placeholder='Enter ticket number...'
                    value={ticketId || ''}
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
                        className={`${styles.ticketCell} ${item.isCalled ? styles.called : ''}`}
                    >
                        {item.num}
                    </span>
                ))}
            </div>
        </div>
    )
}


export default TicketDisplay;