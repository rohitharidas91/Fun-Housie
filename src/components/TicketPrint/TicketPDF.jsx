import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const TICKETS_PER_PAGE = 6; // 6 tickets per page, one per row

const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    pageContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    ticketContainer: {
        width: '50%',
        marginBottom: 10,
        border: '1px solid #000',
    },
    header: {
        fontSize: 12,
        paddingBottom: 5,
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',
        borderBottom: '0.5px solid #000',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'space-evenly',
    },
    cell: {
        width: '11.11%', // 100% / 9 columns
        height: '100%',
        textAlign: 'center',
        padding: 3,
        border: '1px solid #000',
        fontSize: 16,
        fontFamily: 'Helvetica-Bold',
    }
});

function TicketPDF({ tickets = [] }) {

    if (!tickets || tickets.length === 0) {
        return null;
    }
    // Group tickets into pages
    const pages = [];
    for (let i = 0; i < tickets.length; i += TICKETS_PER_PAGE) {
        pages.push(tickets.slice(i, i + TICKETS_PER_PAGE));
    }

    return (
        <Document>
            {pages.map((pageTickets, pageIndex) => (
                <Page key={pageIndex} size="A4" style={styles.page}>
                    <View style={styles.pageContent}>
                        {pageTickets.map((ticket) => (
                            <View key={ticket.ticketId} style={styles.ticketContainer}>
                                <Text style={styles.header}>
                                    Ticket#: {ticket.ticketId} - Player Name: {ticket.playerName}
                                </Text>
                                {ticket.ticketNumbers.map((row, rowIndex) => (
                                    <View key={rowIndex} style={styles.row}>
                                        {row.map((num, colIndex) => (
                                            <View key={`${rowIndex}-${colIndex}`} style={styles.cell}>
                                                <Text>{num || ''}</Text>
                                            </View>
                                        ))}
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                </Page>
            ))}
        </Document>
    );
}


export default TicketPDF;