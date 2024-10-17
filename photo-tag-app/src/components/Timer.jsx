import React, { useState, useEffect } from 'react';
import styles from './Timer.module.css'

function Timer({startGame, setFinalTime, gameOver}) {
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        if (gameOver) {
            stopTimer()
            setFinalTime(seconds)
        } else if (startGame) {
            startTimer()
        }
    }, [gameOver])

    const startTimer = () => {
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setSeconds(0);
    };

    return (
        <div className={styles.timerDisplay}>
            <h1>Timer: {seconds}</h1>
        </div>
    );
}

export default Timer;