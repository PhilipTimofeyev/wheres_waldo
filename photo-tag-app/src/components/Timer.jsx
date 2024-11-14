import React, { useState, useEffect } from 'react';
import styles from './Timer.module.css'

function Timer({gameOver}) {
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 10);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        startTimer()
        if (gameOver) stopTimer()
    }, [gameOver])

    const startTimer = () => {
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    function setFixedTime() {
        return (Math.round(seconds * 10) / 1000).toFixed(1)
    }

    return (
        <div className={styles.timerDisplay}>
            <h5>Timer: {setFixedTime()}</h5>
        </div>
    );
}

export default Timer;