import { useState, useMemo } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import styles from './TicketPrint.module.css';
import TicketPDF from './TicketPDF';

function TicketPrint(props) {
    const [selectedPlayer, setSelectedPlayer] = useState('');

    // Get unique player names
    const playerNames = Array.from(new Set(props.tickets.map(ticket => ticket.playerName)));
    
    // Create a memoized map of player names to their tickets
    const playerTicketsMap = useMemo(() => {
        const map = new Map();
        playerNames.forEach(name => {
            map.set(name, props.tickets.filter(ticket => ticket.playerName === name));
        });
        return map;
    }, [props.tickets, playerNames]);

    return (
        <div className={styles.ticketPrint}>
            <div>
                <select
                    className={styles.playerSelect}
                    value={selectedPlayer}
                    onChange={(e) => setSelectedPlayer(e.target.value)}
                >
                    <option value="">Select a player</option>
                    {playerNames.map((name, index) => (
                        <option key={index} value={name}>{name}</option>
                    ))}
                </select>
            </div>
            <div className={styles.downloadButtons}>
                {playerNames.map((playerName) => {
                    const playerTickets = playerTicketsMap.get(playerName) || [];
                    const fileName = `${playerName} - ${playerTickets.length} Tickets`;
                    const pdfDocument = <TicketPDF tickets={playerTickets} />;
                    const isSelected = selectedPlayer === playerName;
                    
                    return (
                        <div 
                        key={playerName} 
                        className={`${styles.downloadButtonContainer} ${isSelected ? '' : styles.hidden}`}
                        >
                            <PDFDownloadLink
                                key={`${playerName}-${playerTickets.length}`}
                                document={pdfDocument}
                                fileName={`${fileName}.pdf`}
                                className={styles.downloadButton}
                            >
                                {({ blob, url, loading, error }) => {
                                    if (loading) return 'Generating PDF...';
                                    if (error) return 'Error generating PDF';
                                    return `⬇️ ${playerName}'s Tickets (${playerTickets.length})`;
                                }}
                            </PDFDownloadLink>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TicketPrint;