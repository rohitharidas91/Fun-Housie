# 🎯 Fun Housie - A Digital Tambola Game

## 🎮 Features
- 🎲 Generate unlimited digital Housie tickets
- ⏳ Built-in timer with auto-number calling
- 🌓 Light/Dark theme support
- 📱 Responsive design for all devices
- 🖨️ Export tickets as PDF
- 🏆 Track winning patterns (Full House, Top Line, etc.)
- 🎨 Modern, clean UI with smooth animations


## 🎲 How to Play Housie/Tambola

### Game Rules:
1. Each player gets a ticket with 15 random numbers between 1-90
2. Numbers are called out randomly one by one
3. Players mark called numbers on their tickets
4. First player to complete a winning pattern takes the prize
5. The game ends when a player completes a house

### Winning Patterns:
- **Top Line**: Complete all numbers in the top row
- **Middle Line**: Complete all numbers in the middle row
- **Bottom Line**: Complete all numbers in the bottom row
- **Four Corners**: Mark the first and last number of the top and bottom rows
- **Star**: Mark the first and last number of the top and bottom rows and the center number of the middle row
- **Full House**: Mark all numbers on the ticket

### Stack
- React
- Vanilla CSS (Use Tailwind or Bootstrap if you wish)

🛠️ Development Guide
Project Structure

```
src/
├── assets/               # Images, fonts, etc.
├── components/           # Reusable components
│   ├── App/             # Main application component
│   ├── Board/           # Game board component
│   ├── GameMenu/        # Game controls and menu
│   ├── Header/          # Application header
│   ├── Theme/           # Theme-related components
│   ├── TicketDisplay/   # Ticket display component
│   ├── TicketGenerator/ # Ticket generation interface
│   ├── TicketList/      # List of generated tickets
│   ├── TicketPrint/     # Ticket printing functionality
│   ├── TicketPrintMenu/ # Print menu options
│   └── Timer/           # Game timer component
└── util/                # Utility functions
```

## 🛠️ Core Implementation Steps

### 1. Set up the game board
- Create a 9x3 grid for the Housie board
- Implement number generation logic (1-90)
### 2. Set up the timer
- Add visual feedback for called numbers

### 3. Create ticket generation
- Implement algorithm to generate valid Housie tickets
- Ensure proper number distribution (1-90 across 9 columns)
- Add validation for ticket rules

### 4. Build the UI
- Design responsive layout
- Add theme support (light/dark)
- Implement game controls

### 5. Add game logic
- Win condition checking

## 🚀 Advanced Features
- PDF/PNG Export functionality for tickets

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.