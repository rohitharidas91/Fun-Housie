import { useEffect } from 'react';
import styles from './Timer.module.css';


function Timer(props) {

    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (props.timeLeft / props.speed) * circumference;

    //This its the outer part of the circle (White space)
    const circleTimer = (
        <circle
            cy='100'
            cx='100'
            r={radius}
            className={styles.circleTimer}
        />
    )
    //This is the actual timer
    const circleProgress = (
        <circle
            cy='100'
            cx='100'
            r={radius}
            className={styles.circleProgress}
            stroke-dasharray={circumference}
            strokeDashoffset={strokeDashoffset}
        />
    )

    //The current called number within the circle
    const circleNumber = (
        <text
            x='100'
            y='100'
            textAnchor='middle'
            dominantBaseline='central'
            className={styles.circleNumber}
        >{props.currentNum}</text>
    )

    // Reset timeLeft when speed changes
    useEffect(() => {
        props.setTimeLeft(props.speed);
    }, [props.speed]);
    
    // Handle the countdown interval
    useEffect(() => {
        let interval = null;
        if (!props.pause && props.timeLeft > 0) {
            interval = setInterval(() => {
                props.setTimeLeft(timeLeft => timeLeft - 0.05); // Update every 1 sec
            }, 15);
        } else if (props.timeLeft <= 0) {
            props.callNumber();
            props.setTimeLeft(props.speed);
        }

        return () => clearInterval(interval);
    }, [props.timeLeft, props.setTimeLeft, props.pause]);

    
    return (
        <div className={styles.circleContainer}>
            <svg
                viewBox='0 0 200 200'
                className={styles.svgViewbox}
            >
                {circleTimer}
                {circleProgress}
                {circleNumber}
            </svg>
        </div>
    );
};


export default Timer;