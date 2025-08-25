import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import styles from './TicketPrintMenu.module.css';

function TicketPrintMenu(props) {
    const ticketPrintRef = useRef(null);

    // Get unique player names
    const playerNames = Array.from(new Set(props.tickets.map(ticket => ticket.playerName)));

    // Export PDF function
    const handleExportPDF = async () => {
        //Error handler if player is not selected
        if (!props.selectedPlayer) {
            alert('Please select a player to export tickets!');
            return;
        }

        if (!ticketPrintRef.current) return;

        try {
            // Generate high-quality canvas of all tickets
            const canvas = await html2canvas(ticketPrintRef.current, {
                scale: 2, // Higher resolution for better print quality
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });
            
            const imgData = canvas.toDataURL('image/png');
            
            // A4 dimensions in mm
            const A4_WIDTH = 210;
            const A4_HEIGHT = 297;
            const MARGIN = 10; // 10mm margin on all sides
            
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // Calculate available space
            const availableWidth = A4_WIDTH - (2 * MARGIN);
            const availableHeight = A4_HEIGHT - (2 * MARGIN);
            
            // Get image properties
            const imgProps = pdf.getImageProperties(imgData);
            const imageRatio = imgProps.width / imgProps.height;
            
            // Calculate scaled dimensions to fit within available space
            let scaledWidth = availableWidth;
            let scaledHeight = availableWidth / imageRatio;
            
            // If height exceeds available space, scale by height instead
            if (scaledHeight > availableHeight) {
                scaledHeight = availableHeight;
                scaledWidth = availableHeight * imageRatio;
            }
            
            // Center the image on the page
            const x = (A4_WIDTH - scaledWidth) / 2;
            const y = (A4_HEIGHT - scaledHeight) / 2;
            
            // Add the image to PDF (only once!)
            pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
            
            const ticketCount = props.selectedPlayer
                ? props.tickets.filter(ticket => ticket.playerName === props.selectedPlayer).length
                : props.tickets.length;
            
            const fileName = `${props.selectedPlayer || 'All Players'} - ${ticketCount} tickets.pdf`;
            pdf.save(fileName);

        } catch (error) {
            console.error('Error generating PDF:', error);
            // Optional: Show user-friendly error message
            alert('Failed to generate PDF. Please try again.');
        }
    };

    // Export PNG function
    const handleExportPNG = async () => {
        //Error handler if player is not selected
        if (!props.selectedPlayer) {
            alert('Please select a player to export tickets!');
            return;
        }

        if (!ticketPrintRef.current) return;

        try {
            // Generate high-quality canvas of all tickets
            const canvas = await html2canvas(ticketPrintRef.current, {
                scale: 3, // Higher resolution for PNG export
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });
            
            // Convert canvas to blob
            canvas.toBlob((blob) => {
                const ticketCount = props.selectedPlayer
                    ? props.tickets.filter(ticket => ticket.playerName === props.selectedPlayer).length
                    : props.tickets.length;
                
                const fileName = `${props.selectedPlayer || 'All Players'} - ${ticketCount} tickets.png`;
                
                // Create download link
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = fileName;
                
                // Trigger download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Clean up
                URL.revokeObjectURL(link.href);
            }, 'image/png', 1.0); // Maximum quality

        } catch (error) {
            console.error('Error generating PNG:', error);
            alert('Failed to generate PNG. Please try again.');
        }
    };

    return (
        <div className={styles.ticketPrintMenu}>
            <select
                className={styles.playerSelect}
                value={props.selectedPlayer}
                onChange={(e) => props.setSelectedPlayer(e.target.value)}
            >
                <option value="">Select a player</option>
                {playerNames.map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                ))}
            </select>
            <button onClick={handleExportPDF}>Export PDF</button>
            <button onClick={handleExportPNG}>Export PNG</button>
            <div className={styles.ticketPrint}>
                <div ref={ticketPrintRef}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default TicketPrintMenu;