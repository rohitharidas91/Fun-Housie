import { useState } from 'react'
import './App.css'
import Header from '../Header/Header'
import GameMenu from '../GameMenu/GameMenu';
import '../Theme/theme.css';
import ThemeProvider from '../Theme/ThemeProvider'

function App() {
  return (
    
      <ThemeProvider>
        <Header />  
        <div className='appBody'>
          <div className='appLeft'>
            <GameMenu />
          </div>
          <div className='appRight'>
            <h3>Under Construction</h3>
          </div>

        </div>
      </ThemeProvider>
    
  )
}

export default App
