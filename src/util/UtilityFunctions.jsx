
export default function generateTicketNumbers() {

    const ticketNumbers = [];
    const allPossibleNumbers = Array.from({ length: 90 }, (_, i) => i + 1);

    for (let i = allPossibleNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allPossibleNumbers[i], allPossibleNumbers[j]] = [allPossibleNumbers[j], allPossibleNumbers[i]];
    }
    for (let i = 0; i < 15; i++) {
        ticketNumbers.push(allPossibleNumbers[i]);
    }

    ticketNumbers.sort((a, b) => a - b);

    return ticketNumbers;
}