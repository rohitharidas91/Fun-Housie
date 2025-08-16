import { useState } from 'react';
import styles from './GameMenu.module.css'

function GameMenu() {

    //function for gameSpeed Slider
    const [speed, setSpeed] = useState(10);
    const handleSlide = (event) => {
        setSpeed(event.target.value);
    }

    return (
        <div className={styles.gameMenu}>
            <button>New Game</button>
            <button>Pause</button>
            <div className={styles.speedContainer}>
                <label for="gameSpeed">Speed: </label>
                <input
                    type="range"
                    id="gameSpeed"
                    name="volume"
                    min="1"
                    max="60"
                    value={speed}
                    onChange={handleSlide}>
                </input>
                <span id="gameSpeedValue">{speed}</span>
            </div>

        </div>
    )
}


export default GameMenu;