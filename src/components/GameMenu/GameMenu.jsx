import { useState } from 'react';
import styles from './GameMenu.module.css'

function GameMenu(props) {

    //function for gameSpeed Slider
    const [value, setValue] = useState(props.speed);

    const handleSlide = (event) => {
        const newValue = Number(event.target.value);
        setValue(newValue);
        props.setSpeed(newValue);
    }

    const handleClickNewGame = () => {
        if (props.gameStarted === false) {
            props.setGameStarted(true)
            props.setPause(false);
            props.callNumber();
        } else props.resetGame();
    }

    const handleClickPause = () => {
        props.setPause(!props.pause);
    }

    
    return (
        <div className={styles.gameMenu}>
            <button onClick={handleClickNewGame}>{props.gameStarted ? 'Reset Game' : 'New Game'}</button>
            <button 
                onClick={handleClickPause}
                disabled={!props.gameStarted || props.gameOver}
                className={(!props.gameStarted || props.gameOver) ? styles.disabledButton : ''}
            >{props.pause ? 'Resume' : 'Pause'}</button>
            <div className={styles.speedContainer}>
                <label for="gameSpeed">Speed: </label>
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