import { useState } from 'react';
import styles from './GameMenu.module.css'

function GameMenu(props) {

    const handleSlide = (e) => {
        props.setSpeed(e.target.value);
    }

    const handleClickPause = () => {
        props.setPause(!props.pause);
    }

    
    return (
        <div className={styles.gameMenu}>
            <button onClick={props.newGame}>{props.gameStarted ? 'Reset Game' : 'New Game'}</button>
            <button 
                onClick={handleClickPause}
                disabled={!props.gameStarted || props.gameOver}
                className={(!props.gameStarted || props.gameOver) ? styles.disabledButton : ''}
            >{props.pause ? 'Resume' : 'Pause'}</button>
            <div className={styles.speedContainer}>
                <label htmlFor="gameSpeed">Speed: </label>
                <input
                    type="range"
                    id="gameSpeed"
                    name="gameSpeed"
                    min="1"
                    max="60"
                    value={props.speed}
                    onChange={handleSlide}>
                </input>
            </div>

        </div>
    )
}


export default GameMenu;