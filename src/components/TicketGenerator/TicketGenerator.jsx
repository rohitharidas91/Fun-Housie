import styles from './TicketGenerator.module.css'
import { FaPlusCircle } from 'react-icons/fa';

function TicketGenerator(props) {
    return (
        <div className={styles.ticketGenerator}>
            <h2>Ticket Generator</h2>
            <div className={styles.ticketInput}>
                <input type='text' placeholder='Player Name...' className={styles.playerName}/>
                <button> <FaPlusCircle /> <p className={styles.btnText}>Generate</p> </button>
            </div>
        </div>
    )
}

export default TicketGenerator;