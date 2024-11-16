import { React, useState, useEffect } from 'react'
import styles from './Level.module.css'

function Countdown({ setStartGame }) {
    const COUNTDOWN = 3 // seconds

    const [count, setCount] = useState(COUNTDOWN);
    const [showText, setShowText] = useState(true);


    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => {
                setCount(count - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }

        setStartGame(true)
    }, [count]);

    useEffect(() => {
        if (showText) {
            const timeoutId = setTimeout(() => {
                setShowText(false);
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [showText]);

    return (
        <div className={styles.countdown}>
            {showText && <h1>{count > 0 ? count : "Go!"}</h1>}
        </div>
    );
}

export default Countdown