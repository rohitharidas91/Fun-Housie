import styles from './TicketPrint.module.css'

function TicketPrint(props) {

    const selectedTickets = props.tickets.filter(ticket => ticket.playerName === props.selectedPlayer);

    return (
        <div className={styles.ticketPrint}>
            {selectedTickets.map((ticket) => (
                <div
                    key={ticket.ticketId}
                    className={styles.ticket}>
                    <h3>{`${ticket.playerName} - Ticket #: ${ticket.ticketId}`}</h3>
                    <div className={styles.ticketDisplayBody}>
                        {ticket.ticketNumbers.flat().map((number, index) => (
                            <span
                                key={index}
                                className={styles.ticketCell}
                            >
                                {number || ''}
                            </span>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    )
}

export default TicketPrint;