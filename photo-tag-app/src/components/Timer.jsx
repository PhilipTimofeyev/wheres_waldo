import React, { useState, useEffect } from 'react';

function Timer({setStartGame, isRunning, setIsRunning, seconds, setSeconds}) {
    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const startTimer = () => {
        setIsRunning(true);
        setStartGame(true)
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setSeconds(0);
    };

    // console.log(props.allFound)

    return (
        <div>
            <h1>{seconds}</h1>
            <button onClick={startTimer}>Start</button>
            {/* <button onClick={stopTimer}>Stop</button>
            <button onClick={resetTimer}>Reset</button> */}
        </div>
    );
}

export default Timer;