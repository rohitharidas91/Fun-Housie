import styles from './TicketGenerator.module.css'

function TicketGenerator(props) {
    return (
        <div className={styles.ticketGenerator}>
            <h2>Ticket Generator</h2>
            <div className={styles.ticketInput}>
                <input type='text' placeholder='Player Name...' className={styles.playerName}/>
                <button>Generate</button>
            </div>
        </div>
    )
}

export default TicketGenerator;