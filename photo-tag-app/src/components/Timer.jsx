import React, { useState, useEffect } from 'react';

function Timer(props) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval;
        if (props.isRunning) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [props.isRunning]);

    const startTimer = () => {
        props.setIsRunning(true);
        props.setStartGame(true)
    };

    // const stopTimer = () => {
    //     setIsRunning(false);
    // };

    // const resetTimer = () => {
    //     setIsRunning(false);
    //     setSeconds(0);
    // };

    // console.log(props.allFound)

    return (
        <div>
            <h1>{seconds}</h1>
            <button onClick={startTimer}>Start</button>
            {props.allFound && console.log("lolol")}
            {/* <button onClick={stopTimer}>Stop</button>
            <button onClick={resetTimer}>Reset</button> */}
        </div>
    );
}

export default Timer;