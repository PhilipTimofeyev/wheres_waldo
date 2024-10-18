import { React, useState, useEffect } from 'react'
import styles from './ScoreForm.module.css'

function ScoreForm({gameOver, scoreQuery, userScore, setUserScore}) {
    const [showModal, setShowModal] = useState(true)
    const [allScores, setAllScores] = useState(false)

    const addHighScore = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = formData.get('username')

        const updateBody = {
            username: username,
        };

        const requestOptionsPatch = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateBody)
        };

        try {
            const response = await fetch(`http://127.0.0.1:3000/api/scores/${scoreQuery.id}`, requestOptionsPatch);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            setUserScore(responseData)
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const getAllScores = async () => {
        const API_SCORE_URL = "http://127.0.0.1:3000/api/scores"
        try {
            const response = await fetch(API_SCORE_URL)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            setAllScores(responseData)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getAllScores()
    }, [gameOver, userScore])

    function handleClick() {
        setShowModal(false)
    }

    function ModalForm() {

        return (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h2>You solved it in {userScore.score} seconds!</h2>
                    <HighScores allScores={allScores} userScore={userScore}/>
                    <form method='post' onSubmit={addHighScore} className={styles.form}>
                        <div>
                            <label htmlFor="username">Name: </label>
                            <input type="text" name="username" id="userNameInputField" />
                            <br />
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                    <button onClick={handleClick}>Close</button>
                </div>
            </div>
        )
    }

    return (
        <>
            {showModal && allScores && <ModalForm/>}
        </>
    )
}

function HighScores({allScores, userScore}) {

    function checkIfHighScore() {
        return !allScores.some((score) => {
            return score.score < userScore.score
        })
    }

    const topScores = allScores.slice(0, 5).map((score, idx) =>
        <tbody key={score.id}>
            <tr>
                <td>{idx + 1}</td>
                <td>{score.username}</td>
                <td>{score.score}</td>
            </tr>
        </tbody>
    )

    return (
        <>
        {checkIfHighScore() && <h2>New High Score!</h2>}
        <div className={styles.table}>
            <table>
                <thead>
                    <tr>
                        <th><u>Rank</u></th>
                        <th><u>Username</u></th>
                        <th><u>Score (sec)</u></th>
                    </tr>
                </thead>
                {topScores}
            </table>
        </div>
        </>
    )
}


export default ScoreForm
