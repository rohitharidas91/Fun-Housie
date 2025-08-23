//Firstly I really hate working with nested loops (my brain goes brrrr).
//So my apologies if this algo is bonkers.
//The idea is to generate 15 random numbers from 1-90 but there should be at least one but no more than 3 numbers from each decade

export default function generateTicketNumbers() {
    
    //Declare empty array for final return
    const ticketNumbers = [];
    const remainingNumbers = [];
    
    //The inner loop will generate 3 unique numbers
    //The outer loop will multiply a randomly generated number with the current decade
    //Need to use 'start' and 'end' here to avoid using useState.
    for (let decade = 0; decade <= 80; decade += 10) {
        const numsInDecade = [];
        const start = decade + 1;
        const end = decade + 10;
        
        // Generate 3 unique numbers for each decade
        while (numsInDecade.length < 3) {
            // Generate a random number within the decade's range
            const randomNum = Math.floor(Math.random() * (end - start + 1)) + start;
            
            // Add the number if it's not already in the array
            if (!numsInDecade.includes(randomNum)) {
                numsInDecade.push(randomNum);
            }
        }

        //Push the first number from each decade to ensure at least one number from each decade gets pushed
        ticketNumbers.push(numsInDecade[0])

        //Now we need to randomly push the remaining 18 Numbers into a temp array
        remainingNumbers.push(numsInDecade[1]);
        remainingNumbers.push(numsInDecade[2]);
    }

    //Now I pick 6 numbers from the temp array
    while (remainingNumbers.length > 6) {
        const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
        remainingNumbers.splice(randomIndex, 1);
    }
    //Finally push the 6 numbers into my main array
    ticketNumbers.push(...remainingNumbers);
    return ticketNumbers.sort((a, b) => a - b);
}

//I spent 3 hrs on this algo. God I hope it was worth it, for f**kng 40 lines of code :(
//It looks simple in hindsight but the trial and error was painstaking.

/* Alternatively I am posting the AI solution (by Claude) below to show you what a jackass I am: 


function generateNumbers() {
    const result = [];
    const count = [0,0,0,0,0,0,0,0,0]; // count per decade
    
    // Get one number from each decade first
    for (let d = 0; d < 9; d++) {
        let num = Math.floor(Math.random() * 10) + (d * 10 + 1);
        result.push(num);
        count[d] = 1;
    }
    
    // Add 6 more numbers
    while (result.length < 15) {
        let num = Math.floor(Math.random() * 90) + 1;
        let decade = Math.floor((num - 1) / 10);
        
        if (!result.includes(num) && count[decade] < 3) {
            result.push(num);
            count[decade]++;
        }
    }
    
    return result.sort((a, b) => a - b);
}

Yes the AI solution is better!

*/