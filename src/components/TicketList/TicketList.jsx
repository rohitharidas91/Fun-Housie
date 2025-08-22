import styles from './TicketList.module.css'

function TicketList(props) {

    return (
        <div className={styles.ticketList}>
            {props.tickets.map((item) => (
                <div
                    key={item.ticketId}
                    className={styles.ticketListItem}
                >
                    <input
                        type='checkbox'
                        checked={item.isSelected}
                        onClick={() => props.onTicketSelect(item.ticketId)}
                        className={styles.checkBox}
                    />
                    <span 
                        className={styles.ticketListDtls}
                        onClick={() => props.onTicketSelect(item.ticketId)}
                    >
                        {` 🎟️ Ticket No: ${item.ticketId} | 🕹️   Player: ${item.playerName}`}
                    </span>
                    <button 
                        className={styles.deleteTicket}
                        onClick={() => props.clickDelete(item)}
                    >🗑️</button>
                </div>
            ))}
        </div>
    );
}

export default TicketList;