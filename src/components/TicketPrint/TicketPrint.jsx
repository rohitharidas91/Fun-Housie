import styles from './TicketPrint.module.css';

function TicketPrint(props) {
 
    return (
        <div className={styles.ticketPrint}>
            <button className={styles.btnPdf}> 📄 Print Ticket </button>
            <span>
                <p> ⬅️ Select tickets and export to pdf to print your ticket.</p>
            </span>
        </div>
    )
}

export default TicketPrint;