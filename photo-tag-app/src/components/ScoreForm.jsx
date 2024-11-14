import { React, useState, useEffect } from 'react'
import styles from './ScoreForm.module.css'

function ScoreForm({gameOver, scoreQuery, userScore, setUserScore}) {
    const [showModal, setShowModal] = useState(true)
    const [allScores, setAllScores] = useState(false)
    const [showForm, setShowForm] = useState(false)

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

    const removeScore = async() => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/scores/${userScore.id}`, {method: 'DELETE'});
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            console.log(responseData)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getAllScores = async () => {
        const API_SCORE_URL = "http://127.0.0.1:3000/api/scores"

        try {
            const response = await fetch(`${API_SCORE_URL}?picture_id=${scoreQuery.picture_id}`)
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

    function closeModal() {
        setShowModal(false)
        // removeScore()
    }

    function ModalForm() {

        return (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <HighScores allScores={allScores} userScore={userScore} setShowForm={setShowForm}/>
                    {showForm &&
                    <div>
                        <form method='post' onSubmit={addHighScore} className={styles.form}>
                                <div className={styles.formInput} >
                                    <label htmlFor="username"><b>Enter Name</b> </label>
                                <input type="text" name="username" id="userNameInputField" />
                                <br />
                                <input type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                    }
                    <button onClick={closeModal}>Close</button>
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

function HighScores({allScores, userScore, setShowForm}) {

    const [isHighScore, setIsHighScore] = useState(false)
    const [isTopFive, setIsTopFive] = useState(false)

    function checkIfHighScore() {
        // Checks if score is top 5 or highest

        if (allScores.slice(0, 5).every(score => score.score > userScore.score)) {
            setShowForm(true)
            return setIsHighScore(true)
        }
        
        if (allScores.slice(0, 5).at(-1).score > userScore.score || allScores.length < 6) {
            setShowForm(true)
            return setIsTopFive(true)
        }
    }

    useEffect(() => {
        checkIfHighScore()
    }, [userScore])

    const topScores = allScores.slice(0, 5).map((score, idx) => {
        let color = ''
        if (score.id === userScore.id) color = 'red'
        return (
            <tbody key={score.id}>
                <tr style={{color: color}}>
                    <td>{idx + 1}</td>
                    <td>{score.username}</td>
                    <td>{score.score}</td>
                </tr>
            </tbody>
            )
        }
    )

    return (
        <>
            {isHighScore && <h2>New High Score!</h2>}
            {isTopFive && <h2><u>You're in the Top Five!</u></h2>}
            <h3>You solved it in: <br/>{userScore.score} seconds!</h3>
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
