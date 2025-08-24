import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import styles from './TicketPrint.module.css';
import TicketPDF from './TicketPDF';

function TicketPrint(props) {
    const [isGenerating, setIsGenerating] = useState(false);
    const selectedTickets = props.tickets.filter(ticket => ticket.isSelected);
    const hasSelectedTickets = selectedTickets.length > 0;
    const fileName = hasSelectedTickets
        ? `${selectedTickets[0].playerName} - ${selectedTickets.length} Tickets`
        : 'Tickets';

    if (!hasSelectedTickets) {
        return (
            <div className={styles.ticketPrint}>
                <span>
                    <p>Select ticket(s) to export...</p>
                </span>
            </div>
        );
    }

    return (
        <div className={styles.ticketPrint}>
            {hasSelectedTickets && (
                <PDFDownloadLink
                    document={<TicketPDF tickets={selectedTickets} />}
                    fileName={`${fileName}.pdf`}
                    className={styles.downloadButton}
                    onClick={() => setIsGenerating(true)}
                >
                    {({ loading }) => 
                        loading ? 'Generating PDF...' : '⬇️ Download All Tickets PDF'
                    }
                </PDFDownloadLink>
            )}
        </div>
    );
}

export default TicketPrint;