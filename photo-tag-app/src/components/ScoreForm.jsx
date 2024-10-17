import { React, useState, useEffect } from 'react'
import styles from './ScoreForm.module.css'

function ScoreForm({scoreID, gameOver}) {
    const [showModal, setShowModal] = useState(false)

    const addHighScore = async (e) => {
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
            const response = await fetch(`http://127.0.0.1:3000/api/scores/${scoreID}`, requestOptionsPatch);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
        } catch (error) {
            console.error('Error:', error);
        }

        setShowModal(false)
    }

    useEffect(() => {
        if (gameOver) setShowModal(true)
    }, [gameOver])

    function modalForm() {
        return (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h2>New High Score!</h2>
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
            {gameOver && modalForm()}
        </>
    )
}

export default ScoreForm
