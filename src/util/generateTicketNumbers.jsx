//Firstly I really hate working with nested loops (my brain goes brrrr).
//So my apologies if this algo is bonkers.
//The idea is to generate 15 random numbers from 1-90 but there should be at least one but no more than 3 numbers from each decade
//Did I use AI for this part? Absolutely yes,I suck at coding.

export default function generateTicketNumbers() {
    // Initialize empty 3x9 grid
    let ticket = Array(3).fill().map(() => Array(9).fill(0));
    
    // Create number pools for each column
    let pools = Array(9).fill().map((_, col) => {
        if (col === 0) return Array.from({length: 9}, (_, i) => i + 1);
        if (col === 8) return Array.from({length: 11}, (_, i) => i + 80);
        return Array.from({length: 10}, (_, i) => i + col * 10);
    });
    
    // Helper functions
    const rowCount = row => ticket[row].filter(n => n !== 0).length;
    const colCount = col => ticket.map(row => row[col]).filter(n => n !== 0).length;
    const pickRandom = arr => arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
    
    // Step 1: Place one number in each column
    for (let col = 0; col < 9; col++) {
        for (let attempts = 0; attempts < 10; attempts++) {
            let row = Math.floor(Math.random() * 3);
            if (rowCount(row) < 5 && ticket[row][col] === 0) {
                ticket[row][col] = pickRandom(pools[col]);
                break;
            }
        }
    }
    
    // Step 2: Fill to exactly 15 numbers
    let placed = ticket.flat().filter(n => n !== 0).length;
    while (placed < 15) {
        let col = Math.floor(Math.random() * 9);
        let row = Math.floor(Math.random() * 3);
        
        if (rowCount(row) < 5 && colCount(col) < 3 && 
            ticket[row][col] === 0 && pools[col].length > 0 && 
            Math.random() < 0.7) {
            ticket[row][col] = pickRandom(pools[col]);
            placed++;
        }
    }
    
    // Step 3: Sort each column
    for (let col = 0; col < 9; col++) {
        let numbers = ticket.map(row => row[col]).filter(n => n !== 0).sort((a, b) => a - b);
        let index = 0;
        for (let row = 0; row < 3; row++) {
            if (ticket[row][col] !== 0) {
                ticket[row][col] = numbers[index++];
            }
        }
    }
    
    return ticket;
}
