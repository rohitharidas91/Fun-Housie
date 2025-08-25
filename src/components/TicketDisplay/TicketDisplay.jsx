import { FaMagnifyingGlass } from 'react-icons/fa6';
import styles from './TicketDisplay.module.css'
import { useState, useEffect, useRef } from 'react';

function TicketDisplay(props) {
    // This is for reselecting the number when enter key is pressed.
    const inputRef = useRef(null);

    const initialGrid = Array(27).fill({ num: '', isCalled: false, row:'' })
    const [ticketGrid, setTicketGrid] = useState(initialGrid);
    const [ticketId, setTicketId] = useState('');

    //*** Winning tag variables ***// They will be visible if the condition is met

    const [topLine, setTopLine] = useState(false);
    const [midLine, setMidLine] = useState(false);
    const [botLine, setBotLine] = useState(false);
    const [house, setHouse] = useState(false);
    const [jFive, setJFive] = useState(false);
    const [jSeven, setJSeven] = useState(false);
    const [fourCorners, setFourCorners] = useState(false);
    const [star, setStar] = useState(false);


    // *** Using The Ticket Data to update the grid ***//

    const updateTicketGrid = (ticketToDisplay) => {
        if (!ticketToDisplay) return;

        // ******* First Part of this is to display the grid *******//

        const topRow = ticketToDisplay.ticketNumbers[0];
        const midRow = ticketToDisplay.ticketNumbers[1];
        const botRow = ticketToDisplay.ticketNumbers[2];

        // Using seperate rows to handle the winning tags later on
        const topRowGrid = topRow.map(num => ({
            num: num || '',
            isCalled: num ? props.gridNum.some(item => item.num === num && item.isCalled) : false,
            row: 'top'
        }));
        const midRowGrid = midRow.map(num => ({
            num: num || '',
            isCalled: num ? props.gridNum.some(item => item.num === num && item.isCalled) : false,
            row: 'mid'
        }));
        const botRowGrid = botRow.map(num => ({
            num: num || '',
            isCalled: num ? props.gridNum.some(item => item.num === num && item.isCalled) : false,
            row: 'bot'
        }));

        //combine the 3 objects for displayGrid
        const updatedGrid = [...topRowGrid, ...midRowGrid, ...botRowGrid];

        

        //******Second part of this is to handle the winning tags******//

        setTopLine(topRowGrid.filter(cell => cell.num !== '').every(cell => cell.isCalled));
        setMidLine(midRowGrid.filter(cell => cell.num !== '').every(cell => cell.isCalled));
        setBotLine(botRowGrid.filter(cell => cell.num !== '').every(cell => cell.isCalled));
        setHouse(updatedGrid.filter(cell => cell.num !== '').every(cell => cell.isCalled));
        setJFive(updatedGrid.filter(cell => cell.num !== '' && cell.isCalled).length >=5);
        setJSeven(updatedGrid.filter(cell => cell.num !== '' && cell.isCalled).length >=7);
        setFourCorners(
            topRowGrid.filter(cell => cell.num !== '')[0]?.isCalled && 
            topRowGrid.filter(cell => cell.num !== '')[4]?.isCalled && 
            botRowGrid.filter(cell => cell.num !== '')[0]?.isCalled && 
            botRowGrid.filter(cell => cell.num !== '')[4]?.isCalled
        );
        setStar(
            topRowGrid.filter(cell => cell.num !== '')[0]?.isCalled && 
            topRowGrid.filter(cell => cell.num !== '')[4]?.isCalled && 
            botRowGrid.filter(cell => cell.num !== '')[0]?.isCalled && 
            botRowGrid.filter(cell => cell.num !== '')[4]?.isCalled &&
            midRowGrid.filter(cell => cell.num !== '')[2]?.isCalled 

        );

        setTicketGrid(updatedGrid);
    };

    // Click handler for ticket display when the ticket number is input and button is clicked //
    const displayTicket = () => {
        if (!ticketId) {
            setTicketGrid(initialGrid)
            setTopLine(false)
            setMidLine(false)
            setBotLine(false)
            setHouse(false)
            setJFive(false)
            setJSeven(false)
            setFourCorners(false)
            setStar(false)
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
                    ref={inputRef}
                    className={styles.ticketNum}
                    placeholder='Ticket number...'
                    value={ticketId || ''}
                    onChange={(e) => setTicketId(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            displayTicket();
                            inputRef.current.select();
                        }
                    }}
                />
                <button
                    className={styles.btnView}
                    onClick={displayTicket}
                ><FaMagnifyingGlass /></button>
                <span className={styles.winningTags}>
                    <p className={jFive ? styles.active : ''}>Jaldi 5</p>
                    <p className={jSeven ? styles.active : ''}>Jaldi 7</p>
                    <p className={topLine ? styles.active : ''}>Top line</p>
                    <p className={midLine ? styles.active : ''}>Middle line</p>
                    <p className={botLine ? styles.active : ''}>Bottom line</p>
                    <p className={fourCorners ? styles.active : ''}>Four corners</p>
                    <p className={star ? styles.active : ''}>Star</p>
                    <p className={house ? styles.active : ''}>House</p>
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