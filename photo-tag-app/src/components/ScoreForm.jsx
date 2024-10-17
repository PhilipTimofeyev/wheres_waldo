import { React, useState, useEffect } from 'react'
import styles from './ScoreForm.module.css'

function ScoreForm({gameOver, scoreQuery, allScores}) {
    const [showModal, setShowModal] = useState(true)

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
        } catch (error) {
            console.error('Error:', error);
        }

        setShowModal(false)
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

    function modalForm() {
        return (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    {/* <h2>You solved in {scoreQuery.score}</h2> */}
                    <h2>New High Score!</h2>
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
                    <form method='post' onSubmit={addHighScore} className={styles.form}>
                        <div>
                            <label htmlFor="username">Name: </label>
                            <input type="text" name="username" id="userNameInputField" />
                            <br />
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <>
            {showModal && modalForm()}
            
        </>
    )
}

export default ScoreForm
